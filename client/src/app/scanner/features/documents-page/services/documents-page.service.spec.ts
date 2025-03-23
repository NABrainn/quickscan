import { TestBed } from '@angular/core/testing';

import { DocumentsPageService } from './documents-page.service';

describe('DocumentsService', () => {
  let service: DocumentsPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentsPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
