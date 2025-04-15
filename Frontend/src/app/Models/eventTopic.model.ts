
export class EventTopic {
    id?: string;
    title: string;
    description: string;
    createdAt: Date;
    eventDate?: Date; // Optionnel si c'est un topic
    isEvent: boolean;
    location?: string; // Optionnel si c'est un topic
    commentIds: string[];
  
    reportIds: string[];
  
    constructor(data?: Partial<EventTopic>) {
      this.id = data?.id;
      this.title = data?.title || '';
      this.description = data?.description || '';
      this.createdAt = data?.createdAt ? new Date(data.createdAt) : new Date();
      this.eventDate = data?.eventDate ? new Date(data.eventDate) : undefined;
      this.isEvent = data?.isEvent ?? false;
      this.location = data?.location;
      this.commentIds = data?.commentIds || [];
   
      this.reportIds = data?.reportIds || [];
    }
  }