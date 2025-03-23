import { computed, effect, Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private _isLoading = signal<boolean>(false);

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
