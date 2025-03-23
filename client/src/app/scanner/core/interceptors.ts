import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, finalize, Observable, throwError } from "rxjs";
import { LoadingService } from "./loading.service";
import { Router } from "@angular/router";

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

  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        router.navigate(['/skaner/skanuj']);
      }
      return throwError(() => error);
    })
  );
}