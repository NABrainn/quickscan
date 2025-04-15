import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { API_URL } from 'environment';

export type AuthUser = {
  username?: string,
  email: string,
  password: string
}

export type TokenPair = {
  accessToken: string,
  refreshToken: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #http = inject(HttpClient)
  #router = inject(Router);
  
  authenticated = signal<boolean>(false);

  signup(data: AuthUser) {
    return this.#http.post(`${API_URL}/auth/signup`, data)
  }

  login(data: AuthUser) {
    return this.#http.post(`${API_URL}/auth/login`, data)
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
}
