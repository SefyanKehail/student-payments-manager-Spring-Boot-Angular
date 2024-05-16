import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Payment} from "../models/payment.model";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) {
  }

  getAll() {
    return this.httpClient.get<Payment[]>(environment.host + '/payments');
  }

  getStudentPayments(studentCode: any) {
    return this.httpClient.get<Payment[]>(environment.host + `/payments/student/${studentCode}`)
  }

  save(newPaymentFormData: FormData){
    return this.httpClient.post<Payment>(environment.host + `/payments`, newPaymentFormData)
  }

  getPaymentFile(paymentId: number){
    return this.httpClient.get(environment.host + `/payments/file/${paymentId}`, {responseType: "blob"});
  }
}
