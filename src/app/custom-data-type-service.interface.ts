import { CustomDataType } from './custom-data-type';

export interface CustomDataTypeServiceInterface {
  getList(): CustomDataType[];
  add(item: CustomDataType): void;
  remove(id: number): void;
}