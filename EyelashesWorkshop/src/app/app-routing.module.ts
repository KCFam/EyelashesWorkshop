import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';


import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { StaffTransactionComponent } from './staffs/staff-transaction/staff-transaction.component';

const routes: Routes = [

  //Site routes goes here 
  { 
    path: '', 
    component: SiteLayoutComponent,
    children: [
      { path: '', component: StaffTransactionComponent, pathMatch: 'full'},
      { path: '', component: HomeComponent, pathMatch: 'full'},
      
      { path: 'about', component: AboutComponent },
      { path: 'test/:id', component: AboutComponent }
    ]
  },

  // App routes goes here here
  { 
      path: '',
      component: AppLayoutComponent, 
      children: [
      ]
  },

  //no layout routes
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
