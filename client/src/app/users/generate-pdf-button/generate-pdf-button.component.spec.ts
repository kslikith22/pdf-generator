import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePdfButtonComponent } from './generate-pdf-button.component';

describe('GeneratePdfButtonComponent', () => {
  let component: GeneratePdfButtonComponent;
  let fixture: ComponentFixture<GeneratePdfButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneratePdfButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneratePdfButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
