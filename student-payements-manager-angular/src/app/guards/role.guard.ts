import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";

export const roleGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (authService.isAuthorized(authService.authenticatedUser.roles, route.data['authorizedRoles'])){
    return true
  } else {
    router.navigateByUrl("/login");
    return false;
  }
};
