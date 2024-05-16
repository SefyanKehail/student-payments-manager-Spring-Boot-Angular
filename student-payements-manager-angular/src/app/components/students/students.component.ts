import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {StudentService} from "../../services/student.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit {

  students!: any;
  dataSource!: any;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'code', 'programId', 'photo', 'actions']
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort


  constructor(
    private studentService: StudentService,
    private router: Router) {
  }
  ngOnInit(): void {
    this.studentService.getAll().subscribe(
      {
        next: students => {
          console.log(students);
          this.students = students;
          this.dataSource = new MatTableDataSource(this.students);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: err => {
          console.log(err)
        }
      }
    )
  }

  showStudentPayments(code:any) {
    this.router.navigateByUrl(`/payments/student/${code}`)
  }
}
