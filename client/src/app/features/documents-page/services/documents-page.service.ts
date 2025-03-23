import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Document } from 'app/shared/types';
import { API_URL } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentsPageService {

  private readonly http = inject(HttpClient);

  getDocumentsPage(pageNumber: number, pageSize: number) {
    return this.http.get(`${API_URL}/documents?page=${pageNumber}&size=${pageSize}`);
  }

  findById(id: number | undefined) {
    return this.http.get(`${API_URL}/documents/${id}`);
  }

  delete(id: number | undefined) {
    return this.http.delete(`${API_URL}/documents/${id}`, {responseType: 'text'});
  }

  update(document: Document) {
    return this.http.put(`${API_URL}/documents`, document);
  }
}
