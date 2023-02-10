import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserListComponent } from './components/user-list/user-list.component';


const routes: Routes = [
  {
   path:'',redirectTo:'users-list', pathMatch:'full'
  },
  {
    path:'users-list', component:UserListComponent
  },
  {
    path:'add-user', component:AddUserComponent
  },
  {
    path:'edit-user/:email',component:UserDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
