import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './views/list/list.component';

const routes: Routes = [
    { path: "list", component: ListComponent },
    { path: "**", redirectTo: "list" }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }