import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccompagnementEncadrantComponent } from './accompagnement-encadrant.component';

describe('AccompagnementEncadrantComponent', () => {
  let component: AccompagnementEncadrantComponent;
  let fixture: ComponentFixture<AccompagnementEncadrantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccompagnementEncadrantComponent]
    });
    fixture = TestBed.createComponent(AccompagnementEncadrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
