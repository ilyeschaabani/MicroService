import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccompagnementListComponent } from './accompagnement-list.component';

describe('AccompagnementListComponent', () => {
  let component: AccompagnementListComponent;
  let fixture: ComponentFixture<AccompagnementListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccompagnementListComponent]
    });
    fixture = TestBed.createComponent(AccompagnementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
