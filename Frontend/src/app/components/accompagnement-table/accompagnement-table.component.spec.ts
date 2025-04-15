import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccompagnementTableComponent } from './accompagnement-table.component';

describe('AccompagnementTableComponent', () => {
  let component: AccompagnementTableComponent;
  let fixture: ComponentFixture<AccompagnementTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccompagnementTableComponent]
    });
    fixture = TestBed.createComponent(AccompagnementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
