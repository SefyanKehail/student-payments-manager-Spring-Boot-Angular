import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Student} from "../models/student.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private httpClient: HttpClient) { }

  getAll(){
    return this.httpClient.get<Student[]>(environment.host + '/students');
  }
}
