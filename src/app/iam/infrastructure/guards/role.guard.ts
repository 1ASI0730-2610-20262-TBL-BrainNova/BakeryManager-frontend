import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../../application/services/authentication.service';
import { RoleType } from '../../domain/model/enums/role-type.enum';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  const requiredRoles = route.data?.['roles'] as RoleType[];

  if (!authService.isLoggedIn()) {
    router.navigate(['/sign-in']);
    return false;
  }

  const user = authService.getCurrentUser();
  if (!user) {
    router.navigate(['/sign-in']);
    return false;
  }

  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  const hasRole = requiredRoles.includes(user.role);
  if (!hasRole) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
