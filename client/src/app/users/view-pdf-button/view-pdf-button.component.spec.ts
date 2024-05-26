import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPdfButtonComponent } from './view-pdf-button.component';

describe('ViewPdfButtonComponent', () => {
  let component: ViewPdfButtonComponent;
  let fixture: ComponentFixture<ViewPdfButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPdfButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewPdfButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
