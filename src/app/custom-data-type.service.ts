import { Injectable } from '@angular/core';
import { CustomDataType } from './custom-data-type';
import { CustomDataTypeServiceInterface } from './custom-data-type-service.interface';
import { LastActionService } from './last-action.service';

@Injectable({
  providedIn: 'root'
})
export class CustomDataTypeService implements CustomDataTypeServiceInterface {
  private list: CustomDataType[] = [];

  constructor(private lastActionService: LastActionService) {
    this.list = [
      { id: 1, value: 42, date: new Date('2024-01-01'), description: 'Opis 1' },
      { id: 2, value: 77, date: new Date('2024-02-12'), description: 'Opis 2' },
      { id: 3, value: 13, date: new Date('2024-03-30'), description: 'Opis 3' },
      { id: 4, value: 7,  date: new Date('2024-04-02'), description: 'Opis 4' },
      { id: 5, value: 99, date: new Date('2024-05-18'), description: 'Opis 5' },
    ];
  }
  getList(): CustomDataType[] {
    return this.list;
  }

  add(item: CustomDataType): void {
    this.list.push(item);
    this.lastActionService.updateLastAdd();
  }

  remove(id: number): void {
    this.list = this.list.filter(item => item.id !== id);
    this.lastActionService.updateLastRemove();
  }
}