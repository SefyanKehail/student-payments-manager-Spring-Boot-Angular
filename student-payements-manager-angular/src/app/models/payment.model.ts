import {Student} from "./student.model";
import {PaymentTypeEnum} from "../enums/payment-type.enum";
import {PaymentStatusEnum} from "../enums/payment-status.enum";

export interface Payment {
  id: number;
  date: string;
  amount: number;
  type: PaymentTypeEnum;
  status: PaymentStatusEnum;
  file: string;
  student: Student
}
