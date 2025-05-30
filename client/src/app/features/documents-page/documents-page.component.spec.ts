import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsPage } from './documents-page.component';

describe('DocumentsPageComponent', () => {
  let component: DocumentsPage;
  let fixture: ComponentFixture<DocumentsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
