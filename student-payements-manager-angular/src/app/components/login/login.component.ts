import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {LoggedInUserDTO} from "../../DTOs/logged-in-user.d.t.o";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(""),
      password: new FormControl(""),
    })
  }

  login() {
    const user:LoggedInUserDTO = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }

    if (this.authService.login(user)) {
      this.router.navigateByUrl("/")
    }
  }
}
