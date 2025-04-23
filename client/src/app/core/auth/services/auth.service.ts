import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { State } from '@shared/types';
import { API_URL } from 'environment';
import { catchError, tap, throwError } from 'rxjs';

export type AuthUser = {
  username?: string,
  email: string,
  password: string
}

export type TokenPair = {
  accessToken: string,
  refreshToken: string
}

type AuthState = State & {
  data: TokenPair | undefined
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #http = inject(HttpClient)
  #router = inject(Router);
  
  authenticated = signal<boolean>(false);
  state = signal<AuthState>({
    data: undefined,
    error: false,
    message: ''
  })

  signup(data: AuthUser) {
    return this.#http.post(`${API_URL}/auth/signup`, data).pipe(
      tap((data: any) => this.state.set({
        data: data,
        error: false,
        message: ''
      })),
      catchError((err: HttpErrorResponse) => {
        this.state.set({
          data: undefined,
          error: true,
          message: err.error
        })
        return throwError(() => err.error)
      })
    )
  }

  login(data: AuthUser) {
    return this.#http.post(`${API_URL}/auth/login`, data).pipe(
      tap((data: any) => this.state.set({
        data: data,
        error: false,
        message: ''
      })),
      catchError((err: HttpErrorResponse) => {
        this.state.set({
          data: undefined,
          error: true,
          message: err.error
        })
        return throwError(() => err.error)
      })
    )
  }

  logout() {
    sessionStorage.clear()
    this.authenticated.set(false);
    this.#router.navigate(['/logowanie']);
  }

  refresh() {
    return this.#http.post(`${API_URL}/auth/refresh-token`, {
      refreshToken: this.getTokenPair().refreshToken
    })
  }

  authenticate(tokenPair: TokenPair) {
    this.setTokenPair(tokenPair.accessToken, tokenPair.refreshToken)
    this.authenticated.set(true);
  }

  setTokenPair(accessToken: string, refreshToken: string) {
    sessionStorage.setItem('accessToken', accessToken)
    sessionStorage.setItem('refreshToken', refreshToken)
  }

  getTokenPair() {
    return {
      accessToken: sessionStorage.getItem('accessToken'),
      refreshToken: sessionStorage.getItem('refreshToken')
    } as TokenPair
  }

  reset() {
    this.state.set({
      data: undefined,
      error: false,
      message: ''
    })
  }
}
