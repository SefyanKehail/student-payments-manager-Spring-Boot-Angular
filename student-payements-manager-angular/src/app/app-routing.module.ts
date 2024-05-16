import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {StudentsComponent} from "./components/students/students.component";
import {PaymentsComponent} from "./components/payments/payments.component";
import {LoginComponent} from "./components/login/login.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {ImportStudentsComponent} from "./components/import-students/import-students.component";
import {ImportPaymentsComponent} from "./components/import-payments/import-payments.component";
import {LayoutComponent} from "./components/layout/layout.component";
import {authGuard} from "./guards/auth.guard";
import {roleGuard} from "./guards/role.guard";
import {StudentPaymentsComponent} from "./components/student-payments/student-payments.component";
import {NewPaymentComponent} from "./components/new-payment/new-payment.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, canActivate: [authGuard], children: [
      {path: '', component: HomeComponent, pathMatch: "full"},
      {path: 'home', component: HomeComponent},
      {path: 'students', component: StudentsComponent},

      {
        path: 'payments', children: [
          {path: 'all', component: PaymentsComponent},
          {path: 'student/:code', component: StudentPaymentsComponent},
          {path: ':studentCode', component: NewPaymentComponent},
        ]
      },

      {path: 'dashboard', component: DashboardComponent},
      {path: 'profile', component: ProfileComponent},
      {
        path: '', canActivate: [roleGuard], data: {authorizedRoles: ['ADMIN']}, children: [
          {path: 'importStudents', component: ImportStudentsComponent},
          {path: 'importPayments', component: ImportPaymentsComponent},
        ]
      },
    ]
  },

  {path: 'login', component: LoginComponent},

  {path: '**', component: HomeComponent, pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
