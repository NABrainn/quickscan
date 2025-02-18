import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemDetailsComponent } from './list-item-details.component';

describe('ListItemDetailsComponent', () => {
  let component: ListItemDetailsComponent;
  let fixture: ComponentFixture<ListItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListItemDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
