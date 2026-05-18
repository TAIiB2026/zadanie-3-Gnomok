import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-custom-data-form',
  templateUrl: './custom-data-form.component.html'
})
export class CustomDataFormComponent {
  @Output() objectAdded = new EventEmitter<any>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18)]],
      description: ['', [Validators.maxLength(200)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.objectAdded.emit(this.form.value);
      this.form.reset();
    }
  }
}