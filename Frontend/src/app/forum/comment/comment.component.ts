import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../Models/comment.model';
import { CommentService } from '../../../app/services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  comments: Comment[] = [];
    @Input() topicId!: string;
    loading=true; // Input property to receive data
    newCommentContent: string = '';  // Content of the new comment



  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.loadComments();
   }

  loadComments(): void {
    this.commentService.getCommentByTopic(this.topicId).subscribe((data) => {this.comments = data; this.loading=false});
  } 
  addComment():void{
    if (this.newCommentContent.trim()) {
      const comment = new Comment({
        content: this.newCommentContent,
        eventTopicId: this.topicId
      });

      this.commentService.createComment(comment).subscribe(
        () => {
       this.loadComments();
       this.newCommentContent=""
        },
        () => {
          console.error("Error adding comment");
        }
      );
  }
}
}
