import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  readonly _canEdit = signal<boolean>(false);
  readonly canEdit = computed(() => this._canEdit());

  readonly _isDataValid = signal<boolean>(false);
  readonly isDataValid = computed(() => this._isDataValid());

}
