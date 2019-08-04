// Angular 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// Utilities
import { SignaturePadModule } from 'angular2-signaturepad';
import { ChartsModule } from 'ng2-charts';

// Project - Modules
import { AppRoutingModule } from './app-routing.module';

// Project - Components
import { AppComponent } from './app.component';
import { SiteFooterComponent } from './_layout/site-footer/site-footer.component';
import { SiteHeaderComponent } from './_layout/site-header/site-header.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { TransactionProductComponent } from './transaction-product/transaction-product.component';
import { SignaturePadComponent } from './Utilities/signature-pad/signature-pad.component';
import { StaffComponent } from './staffs/staff.component';
import { TransactionDashboardComponent } from './dashboards/transaction-dashboard/transaction-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    SiteFooterComponent,
    SiteHeaderComponent,
    SiteLayoutComponent,
    AboutComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    SignaturePadComponent,
    StaffComponent,
    TransactionDashboardComponent,
    TransactionProductComponent
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


