import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CustomDataTypeService } from '../custom-data-type.service';
import { CustomDataType } from '../custom-data-type';

@Component({
  selector: 'app-custom-data-form',
  templateUrl: './custom-data-form.component.html',
  standalone: false
})
export class CustomDataFormComponent {
  @Output() objectAdded = new EventEmitter<void>();
  form: FormGroup;

  constructor(private fb: FormBuilder, private service: CustomDataTypeService) {
    this.form = this.fb.group({
      value: ['', [Validators.required, this.numericRangeValidator(0, 1000)]],
      date: ['', [Validators.required, this.dateValidator()]],
      description: ['', [Validators.required, this.textLengthValidator(5, 200)]]
    });
  }

  numericRangeValidator(min: number, max: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const value = Number(control.value);
      if (isNaN(value) || value < min || value > max) {
        return { numericRange: { min, max } };
      }
      return null;
    };
  }

  dateValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const date = new Date(control.value);
      if (isNaN(date.getTime())) {
        return { invalidDate: true };
      }
      if (date > new Date()) {
        return { futureDate: true };
      }
      return null;
    };
  }

  textLengthValidator(min: number, max: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const length = control.value.length;
      if (length < min || length > max) {
        return { textLength: { min, max } };
      }
      return null;
    };
  }

  patternValidator(pattern: RegExp) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      return pattern.test(control.value) ? null : { pattern: { value: control.value } };
    };
  }

  requiredIfValidator(condition: boolean) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (condition && !control.value) {
        return { requiredIf: true };
      }
      return null;
    };
  }

  onSubmit() {
    if (this.form.valid) {
      const newId = Math.max(...this.service.getList().map(item => item.id), 0) + 1;
      const newObject: CustomDataType = {
        id: newId,
        value: this.form.value.value,
        date: new Date(this.form.value.date),
        description: this.form.value.description
      };
      this.service.add(newObject);
      this.form.reset();
      this.objectAdded.emit();
    }
  }
}