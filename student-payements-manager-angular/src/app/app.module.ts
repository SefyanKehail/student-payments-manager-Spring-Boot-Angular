import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LayoutComponent } from './components/layout/layout.component';
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuModule, MatMenuTrigger} from "@angular/material/menu";
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
  MatSidenavContainer, MatSidenavContent,
  MatSidenavModule
} from "@angular/material/sidenav";
import {MatList, MatListItem, MatListModule} from "@angular/material/list";
import { StudentsComponent } from './components/students/students.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ImportStudentsComponent } from './components/import-students/import-students.component';
import { ImportPaymentsComponent } from './components/import-payments/import-payments.component';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle
} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatFormFieldControl, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatTable, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import { StudentPaymentsComponent } from './components/student-payments/student-payments.component';
import { NewPaymentComponent } from './components/new-payment/new-payment.component';
import {MatOption, MatSelect, MatSelectModule} from "@angular/material/select";
import {MatDatepicker, MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {PdfViewerModule} from "ng2-pdf-viewer";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    StudentsComponent,
    PaymentsComponent,
    ProfileComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    ImportStudentsComponent,
    ImportPaymentsComponent,
    StudentPaymentsComponent,
    NewPaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbar,
    MatButton,
    MatIconModule,
    MatMenuModule,
    MatDrawerContainer,
    MatDrawer,
    MatDrawerContent,
    MatListModule,
    MatCardModule,
    MatDivider,
    MatFormField,
    MatInputModule,
    MatInput,
    MatLabel,
    MatCardActions,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconButton,
    MatPaginator,
    MatSort,
    MatSortHeader,
    MatSelectModule,
    MatMiniFabButton,
    MatDatepickerModule,
    MatNativeDateModule,
    PdfViewerModule,

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
