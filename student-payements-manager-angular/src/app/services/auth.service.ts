import { Injectable } from '@angular/core';
import {LoggedInUserDTO} from "../DTOs/logged-in-user.d.t.o";
import {AuthenticatedUserDTO} from "../DTOs/authenticated-user.d.t.o";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public users:any = {
    admin: {password: "1234", roles: ['STUDENT', 'ADMIN']},
    user1: {password: "1234", roles: ['STUDENT']}
  }

  public authenticatedUser: AuthenticatedUserDTO = {
    username: '',
    isAuthenticated: false,
    roles: []
  };

  constructor(private router: Router) { }

  public login(loggedInUserDTO: LoggedInUserDTO): boolean{
    if (this.checkCredentials(loggedInUserDTO)){
      this.authenticatedUser = {
        username: loggedInUserDTO.username,
        isAuthenticated: true,
        roles: this.users[loggedInUserDTO.username]['roles']
      }
      return true
    }
    return false
  }

  public checkCredentials(loggedInUserDTO: LoggedInUserDTO){
    return (this.users[loggedInUserDTO.username] && this.users[loggedInUserDTO.username]['password'] === loggedInUserDTO.password);
  }

  public logout(){
    this.authenticatedUser = {
      username : '',
      roles: [],
      isAuthenticated: false
    }

    this.router.navigateByUrl('/login')
  }

  // checks if user matches an authorized role
  public isAuthorized(userRoles: string[], authorizedRoles: string[]){
    return userRoles.some(userRole => authorizedRoles.includes(userRole))
  }

  public isAdmin(){
    return this.authenticatedUser.roles.some(userRole => userRole === 'ADMIN');
  }
}
