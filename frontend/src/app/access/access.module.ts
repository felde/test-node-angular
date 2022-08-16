import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateAccessComponent } from './views/template/template.component';
import { LoginComponent } from './views/login/login.component';
import { LogoutComponent } from './views/logout/logout.component';
import { AccessRoutingModule } from './access-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './views/register/register.component';



@NgModule({
  declarations: [
    TemplateAccessComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AccessRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AccessModule { }
