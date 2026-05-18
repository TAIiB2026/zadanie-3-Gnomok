import { Component, OnInit } from '@angular/core';
import { CustomDataTypeService } from '../custom-data-type.service';
import { CustomDataType } from '../custom-data-type';

@Component({
  selector: 'app-custom-data-list',
  templateUrl: './custom-data-list.component.html',
  standalone: false
})
export class CustomDataListComponent implements OnInit {
  data: CustomDataType[] = [];
  showForm = false;

  constructor(private service: CustomDataTypeService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.data = this.service.getList();
  }

  remove(id: number) {
    this.service.remove(id);
    this.loadData();
  }

  onAdd() {
    this.showForm = false;
    this.loadData();
  }
}