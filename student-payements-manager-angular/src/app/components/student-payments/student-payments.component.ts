import {Component, OnInit, ViewChild} from '@angular/core';
import {PaymentService} from "../../services/payment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-student-payments',
  templateUrl: './student-payments.component.html',
  styleUrl: './student-payments.component.scss'
})
export class StudentPaymentsComponent implements OnInit{

  payments!: any;
  dataSource!: any;
  displayedColumns: string[] = ['id', 'date', 'amount', 'type', 'status', 'firstName']
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  studentCode!: string;
  constructor(
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.studentCode = this.activatedRoute.snapshot.params['code'];

    this.paymentService.getStudentPayments(this.studentCode).subscribe(
      {
        next: payments => {
          this.payments = payments;
          this.dataSource = new MatTableDataSource(this.payments);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: err => console.log(err)
      }
    );
  }

  newPayment() {
    this.router.navigateByUrl(`/payments/${this.studentCode}`)
  }
}
