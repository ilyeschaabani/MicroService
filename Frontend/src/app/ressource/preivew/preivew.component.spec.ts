import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreivewComponent } from './preivew.component';

describe('PreivewComponent', () => {
  let component: PreivewComponent;
  let fixture: ComponentFixture<PreivewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreivewComponent]
    });
    fixture = TestBed.createComponent(PreivewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
