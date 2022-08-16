import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateUsersComponent } from './views/template/template.component';
import { ListComponent } from './views/list/list.component';
import { UsersRoutingModule } from './users-routing.module';



@NgModule({
  declarations: [
    TemplateUsersComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
