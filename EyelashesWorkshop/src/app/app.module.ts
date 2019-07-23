import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { SignaturePadModule } from 'angular2-signaturepad';
import { environment } from '../environments/environment';

import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './_layout/app-header/app-header.component';
import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';
import { SiteFooterComponent } from './_layout/site-footer/site-footer.component';
import { SiteHeaderComponent } from './_layout/site-header/site-header.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { StaffTransactionComponent } from './staffs/staff-transaction/staff-transaction.component';
import { SignaturePadComponent } from './Utilities/signature-pad/signature-pad.component';
import { StaffEditComponent } from './staffs/staff-edit/staff-edit.component';
import { TransactionDashboardComponent } from './dashboards/transaction-dashboard/transaction-dashboard.component';
import { AngularFirestore } from '@angular/fire/firestore';

// const firebase = require("firebase");
// // Required for side-effects
// require("firebase/firestore");
// var firebaseDB = firebase.firestore();

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppLayoutComponent,
    SiteFooterComponent,
    SiteHeaderComponent,
    SiteLayoutComponent,
    AboutComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    StaffTransactionComponent,
    SignaturePadComponent,
    StaffEditComponent,
    TransactionDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SignaturePadModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ChartsModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }


