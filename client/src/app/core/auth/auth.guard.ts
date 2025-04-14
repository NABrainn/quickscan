import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)

  return authService.refresh().pipe(
    map((res: any) => {
      authService.authenticate(res.tokenPair)
      return authService.authenticated()
    }),
    catchError(() => {
      authService.logout()
      return of(authService.authenticated())
    })
  )
};
