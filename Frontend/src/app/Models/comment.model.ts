import { Reaction } from "./reaction.model";

export class Comment {
    id?: string;
    content: string;
    createdAt: Date;
    updatedAt?: Date;
    eventTopicId: string;
    reactions: Reaction[] = [];
  
    constructor(data?: Partial<Comment>) {
      this.id = data?.id;
      this.content = data?.content || '';
      this.createdAt = data?.createdAt ? new Date(data.createdAt) : new Date();
      this.updatedAt = data?.updatedAt ? new Date(data.updatedAt) : undefined;
      this.eventTopicId = data?.eventTopicId || '';
      this.reactions = data?.reactions || [];
    }
  }
  