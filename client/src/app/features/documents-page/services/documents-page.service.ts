import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentsPageService {

  private readonly http = inject(HttpClient);

  getDocumentsPage(pageNumber: number, pageSize: number) {
    return this.http.get(`${environment.apiUrl}/documents?page=${pageNumber}&size=${pageSize}`);
  }

  findById(id: number | undefined) {
    return this.http.get(`${environment.apiUrl}/documents/${id}`);
  }

  delete(id: number | undefined) {
    return this.http.delete(`${environment.apiUrl}/documents/${id}`, {responseType: 'text'});
  }

  update(document: Document) {
    return this.http.put(`${environment.apiUrl}/documents`, document);
  }
}
