import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  httpClient = inject(HttpClient);

  upload(file: FormData) {
    return this.httpClient.post<FormData>(`${API_URL}/scanner/upload`, file);
  }
}
