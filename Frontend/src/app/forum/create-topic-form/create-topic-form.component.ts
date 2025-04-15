import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventTopicService } from 'src/app/services/event-topic.service';
import { Router } from '@angular/router';  // Import Router

@Component({
  selector: 'app-create-topic-form',
  templateUrl: './create-topic-form.component.html',
  styleUrls: ['./create-topic-form.component.css']
})
export class CreateTopicFormComponent {
  topicForm: FormGroup;

  constructor(private eventTopicService: EventTopicService,private router:Router) {
    this.topicForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)])
    });
  }

  createTopic(): void {
    if (this.topicForm.valid) {
      const data={
        title: this.topicForm.get('title')?.value,
        description: this.topicForm.get('description')?.value
      }
      this.eventTopicService.create(data).subscribe((data)=>{
        if(data){
            this.router.navigate(['/forum']);  // Redirect to /forum/create
        }
      })  
    }
  }
}
