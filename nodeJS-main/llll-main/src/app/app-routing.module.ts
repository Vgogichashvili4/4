import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActiveUsersPgComponent } from './Tech-students/active-users-pg/active-users-pg.component';
import { AddCompComponent } from './Tech-students/add-user/add-comp.component';
import { AddproductComponent } from './product/addproduct/addproduct.component';
import { CategoryPgComponent } from './category-pg/category-pg.component';

import { FullUserInfoPgComponent } from './Tech-students/full-user-info-pg/full-user-info-pg.component';

import { ProductComponent } from './product/product.component';
import { UpdateUserComponent } from './Tech-students/update-user/update-user.component';
import { TechStudentsListComponent } from './Tech-students/tech-students-list/tech-students-list.component';


const routes: Routes = [
 
  {
    component:ProductComponent,path:"product",children:[
      {
        component:AddproductComponent,path:"create"
      },
      {
        component:AddproductComponent,path:"edit/:id"
      }
    ]
  },
  {
    component:AddCompComponent,path:'add-user'
  },

  {
    component:UpdateUserComponent,path:'update/:id'
  },
  {component:ActiveUsersPgComponent,path:'user-status'},
  {component:CategoryPgComponent,path:''},
  {path:'full-info',component:FullUserInfoPgComponent},
  {path:"tech-students",component:TechStudentsListComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
