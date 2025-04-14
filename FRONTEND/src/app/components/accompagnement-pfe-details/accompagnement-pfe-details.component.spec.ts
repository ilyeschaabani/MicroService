import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccompagnementPfeDetailsComponent } from './accompagnement-pfe-details.component';

describe('AccompagnementPfeDetailsComponent', () => {
  let component: AccompagnementPfeDetailsComponent;
  let fixture: ComponentFixture<AccompagnementPfeDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccompagnementPfeDetailsComponent]
    });
    fixture = TestBed.createComponent(AccompagnementPfeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
