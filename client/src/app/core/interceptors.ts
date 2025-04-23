import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, finalize, map, Observable, tap, throwError } from "rxjs";
import { AuthService } from "./auth/services/auth.service";
import { LoadingService } from "./auth/services/loading.service";

export function loadingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  const loadingService = inject(LoadingService);

  loadingService.loadingOn();
  return next(req).pipe(
    finalize(() => {
      loadingService.loadingOff();
    })
  )
}

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>>  {

  const authService = inject(AuthService);

  let authorizedReq: HttpRequest<unknown> = req;
  
  if(authService.getTokenPair().accessToken !== undefined && authService.getTokenPair().accessToken !== null)    
    authorizedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authService.getTokenPair().accessToken}`)
    })  

  return next(authorizedReq).pipe(    
    catchError((error: HttpErrorResponse) => {      
    if (error.status === 401 || error.status === 403) {
      authService.logout()
    }
    return throwError(() => error);
  }));
}