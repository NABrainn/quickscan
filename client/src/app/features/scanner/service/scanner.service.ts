import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Invoice, Receipt } from 'app/shared/types';
import { API_URL } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class ScannerService {

  private url: string = API_URL;
  private http = inject(HttpClient);

  uploadFile(data: FormData) {
    return this.http.post(`${this.url}/upload`, data);
  }

  saveDocument(data: Invoice | Receipt) {
    return this.http.post(`${this.url}/documents`, data)
  }
}
