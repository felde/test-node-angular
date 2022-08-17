import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateUsersComponent } from './views/template/template.component';
import { ListComponent } from './views/list/list.component';
import { UsersRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TemplateUsersComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
