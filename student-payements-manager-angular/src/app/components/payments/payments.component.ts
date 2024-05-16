import {Component, OnInit, ViewChild} from '@angular/core';
import {PaymentService} from "../../services/payment.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Payment} from "../../models/payment.model";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent implements OnInit {

  payments!: any;
  dataSource!: any;
  displayedColumns: any[] = ['id', 'date', 'amount', 'type', 'status', 'firstName', 'actions']
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(private paymentService: PaymentService) {
  }

  ngOnInit(): void {
    this.paymentService.getAll().subscribe(
      {
        next: payments => {
          console.log(payments);
          this.payments = payments;
          this.dataSource = new MatTableDataSource(this.payments);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: err => {
          console.log(err)
        }
      }
    )
  }

  showPaymentFile(payment: Payment) {
    return this.paymentService.getPaymentFile(payment.id).subscribe(
      {
        next: file => this.download(file, this.getFileName(payment.file)),
        error: err => console.log(err)
      }
    )
  }

  download(file: Blob, filename: string) {
    console.log(file);
    const newBlob = new Blob([file], {type: "application/pdf"})
    const pdfUrl = window.URL.createObjectURL(newBlob);
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = filename;
    link.click();
  }

  getFileName(fileFullPath: string) {
    const pathParts = fileFullPath.split('/');
    return pathParts[pathParts.length - 1];
  }
}
