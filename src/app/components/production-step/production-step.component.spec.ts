import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionStepComponent } from './production-step.component';

describe('ProductionStepComponent', () => {
  let component: ProductionStepComponent;
  let fixture: ComponentFixture<ProductionStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
