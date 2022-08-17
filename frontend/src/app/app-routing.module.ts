import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateAccessComponent } from './access/views/template/template.component';
import { TemplateUsersComponent } from './users/views/template/template.component';

const routes: Routes = [
  { path: "access", loadChildren: () => import("./access/access.module").then(m => m.AccessModule), component: TemplateAccessComponent },
  { path: "users", loadChildren: () => import("./users/users.module").then(m => m.UsersModule), component: TemplateUsersComponent },
  { path: "**", redirectTo: "access" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
