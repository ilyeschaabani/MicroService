import { Component, OnInit } from '@angular/core';
import { EventTopic } from '../models/eventTopic.model';
import { EventTopicService } from '../services/event-topic.service';
import { Router } from '@angular/router';  // Import Router

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent  implements OnInit {
  eventTopics: EventTopic[] = [];


  constructor(private eventTopicService: EventTopicService,private router:Router) {}

  ngOnInit(): void {
    this.loadEventTopics();
  }

  loadEventTopics(): void {
    this.eventTopicService.getAll().subscribe((data) => (this.eventTopics = data));
  } 
  createEventTopic(): void {
    this.router.navigate(['/forum/create']);  // Redirect to /forum/create
  }
  onReactionAdded():void{
    this.loadEventTopics();
    
  }
}
