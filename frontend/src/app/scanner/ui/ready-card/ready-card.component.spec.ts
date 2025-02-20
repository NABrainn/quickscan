import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyCardComponent } from './ready-card.component';

describe('ReadyCardComponent', () => {
  let component: ReadyCardComponent;
  let fixture: ComponentFixture<ReadyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadyCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
