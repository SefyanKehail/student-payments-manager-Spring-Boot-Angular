import {Component, OnInit} from '@angular/core';
import {PaymentTypeEnum} from "../../enums/payment-type.enum";
import {PaymentStatusEnum} from "../../enums/payment-status.enum";
import {FormControl, FormGroup} from "@angular/forms";
import {PaymentService} from "../../services/payment.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrl: './new-payment.component.scss'
})
export class NewPaymentComponent implements OnInit {

  paymentTypes = Object.values(PaymentTypeEnum);
  paymentStatus = Object.values(PaymentStatusEnum);
  newPaymentForm!: FormGroup;
  studentCode!: string;
  fileURL!: string;

  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {

    this.studentCode = this.activatedRoute.snapshot.params['studentCode'];

    this.newPaymentForm = new FormGroup({
      date: new FormControl(),
      amount: new FormControl(0.00),
      type: new FormControl(this.paymentTypes[0]),
      status: new FormControl(this.paymentStatus[0]),
      file: new FormControl(),
      filename: new FormControl('No file uploaded yet'),
      studentCode: new FormControl({value: this.studentCode, disabled: true}),
    })
  }

  onFileSelected($event: any) {
    const file = $event.target.files[0];
    this.newPaymentForm.patchValue(
      {
        file: file,
        filename: file.name
      }
    )
    this.fileURL = window.URL.createObjectURL(file);
  }


  save() {
    const formValue = this.newPaymentForm.getRawValue();

    // double check if it's actually the current student that we're saving a payment to
    if (this.studentCode === formValue.studentCode) {
      let newPaymentFormData = new FormData();

      const date: Date  = new Date(formValue.date);
      const formattedDate: string = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      newPaymentFormData.set('date', formattedDate)
      newPaymentFormData.set('amount', formValue.amount)
      newPaymentFormData.set('type', formValue.type)
      newPaymentFormData.set('file', formValue.file)
      newPaymentFormData.set('studentCode', formValue.studentCode)
      this.paymentService.save(newPaymentFormData).subscribe(
        {
          next: () => this.router.navigateByUrl(`/payments/student/${this.studentCode}`),
          error: err => console.log(err)
        }
      )
    } else {
      throw new Error("Unexpected Error")
    }

  }
}
