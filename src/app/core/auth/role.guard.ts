import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { PermissionService } from './permission.service';
import { TokenService } from './token.service';
import { RoleRouteData } from './role.model';

const canAccessRoute = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | ReturnType<Router['createUrlTree']> => {
  const permissions = inject(PermissionService);
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (!tokenService.isAuthenticated()) {
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }

  const data = route.data as RoleRouteData;
  if (permissions.hasRole(data.roles) && permissions.canAny(data.permissions)) {
    return true;
  }

  return router.parseUrl('/panel');
};

export const roleGuard: CanActivateFn = (route, state) => canAccessRoute(route, state);

export const roleChildGuard: CanActivateChildFn = (route, state) => canAccessRoute(route, state);
