import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTopicFormComponent } from './create-topic-form.component';

describe('CreateTopicFormComponent', () => {
  let component: CreateTopicFormComponent;
  let fixture: ComponentFixture<CreateTopicFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTopicFormComponent]
    });
    fixture = TestBed.createComponent(CreateTopicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
