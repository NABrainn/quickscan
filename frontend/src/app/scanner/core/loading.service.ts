import { computed, effect, Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private _isLoading = signal<boolean>(false);

  constructor() {
    effect(() => {
      console.log(`${this._isLoading} value changed`)
    })
  }

  isLoading() {
    return this._isLoading();
  }

  loadingOn() {
    this._isLoading.set(true);
  }

  loadingOff() {
    this._isLoading.set(false);
  }
}
