import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';

import { StaffTransactionComponent } from './staff-transaction/staff-transaction.component';
import { StaffComponent } from './staffs/staff.component';
import { TransactionDashboardComponent } from './dashboards/transaction-dashboard/transaction-dashboard.component';

const routes: Routes = [

  //Site routes goes here 
  { 
    path: '', 
    component: SiteLayoutComponent,
    children: [
      { path: '', component: StaffComponent, pathMatch: 'full'},
      
      { path: 'StaffTransaction', component: StaffTransactionComponent },
      { path: 'TransactionDashboard', component: TransactionDashboardComponent },
      { path: 'Staff', component: StaffComponent },
      { path: 'Staff/:id', component: StaffComponent }
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
