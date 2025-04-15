import { Component, EventEmitter, Input, Output } from '@angular/core';
 import { EventTopic } from 'src/app/models/eventTopic.model';
import { EmojiType, Reaction,EmojiMap } from 'src/app/models/reaction.model';
import { ReactionService } from 'src/app/services/reaction.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent {
  constructor(private reactionService:ReactionService){

  }
  
  @Input() eventTopic!: EventTopic; // Input property to receive data
  @Output() reactionAdded = new EventEmitter<void>();  // Output event to notify parent without data
  private  userId="14526426452"
   commentsIsOpen=false;
  emojiTypes: EmojiType[] = [EmojiType.LIKE, EmojiType.HAHA, EmojiType.LOVE, EmojiType.SAD, EmojiType.ANGRY];  // All possible reactions
  getReactionCount(reactions: Reaction[] | undefined, emojiType: EmojiType): number {
    if (!reactions) {
      return 0;  // If no reactions are available, return 0
    }
    return reactions.filter(reaction => reaction.emoji === emojiType).length;
  }
   emojiMap=EmojiMap;
   addReaction(emojiType:EmojiType){
    const entityName="eventTopic";
    const data={
      emoji:emojiType,
      userId:this.userId,
      entityName:entityName,
      entityId:this.eventTopic.id

    }
    this.reactionService.addReaction(data).subscribe(()=>{
      this.reactionAdded.emit();
    })
    }
    hasUserReacted(emojiType: string): boolean {
      return this.eventTopic.reactions.some(reaction => 
        reaction.userId === this.userId && reaction.emoji === emojiType);
    }
    openCommentSpace():void {
      this.commentsIsOpen=!this.commentsIsOpen;
    }
}