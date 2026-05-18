import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomDataListComponent } from './custom-data-list/custom-data-list.component';
const routes: Routes = [
  { path: '', redirectTo: '/lista', pathMatch: 'full' }, 
  { path: 'lista', component: CustomDataListComponent }   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
