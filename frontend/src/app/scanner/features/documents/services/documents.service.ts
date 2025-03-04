import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  private readonly http = inject(HttpClient);

  getDocumentsPage() {
    return this.http.get(`${API_URL}/documents?page=0`);
  }
}
