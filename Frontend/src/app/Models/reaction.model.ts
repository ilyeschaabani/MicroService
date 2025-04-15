export enum EmojiType {
    LIKE = 'LIKE',
    HAHA = 'HAHA',
    LOVE = 'LOVE',
    SAD = 'SAD',
    ANGRY = 'ANGRY'
  }
  
  export const EmojiMap: Record<EmojiType, { emoji: string; description: string }> = {
    [EmojiType.LIKE]: { emoji: '👍', description: 'Like' },
    [EmojiType.HAHA]: { emoji: '😂', description: 'Haha' },
    [EmojiType.LOVE]: { emoji: '❤️', description: 'Love' },
    [EmojiType.SAD]: { emoji: '😢', description: 'Sad' },
    [EmojiType.ANGRY]: { emoji: '😡', description: 'Angry' }
  };
  
  export function getEmojiByDescription(description: string): EmojiType | null {
    return (Object.entries(EmojiMap) as [EmojiType, { emoji: string; description: string }][])
      .find(([_, value]) => value.description.toLowerCase() === description.toLowerCase())
      ?. [0] as EmojiType | null;
  }
  
  
  export class Reaction {
    id?: string;
    emoji: EmojiType;
    userId: string;
    entityName: 'comment' | 'eventTopic'; // "comment" ou "eventTopic"
    entityId: string;
    createdAt: Date;
    updatedAt?: Date;
  
    constructor(data?: Partial<Reaction>) {
      this.id = data?.id;
      this.emoji = data?.emoji || EmojiType.LIKE; // Valeur par défaut
      this.userId = data?.userId || '';
      this.entityName = data?.entityName || 'comment';
      this.entityId = data?.entityId || '';
      this.createdAt = data?.createdAt ? new Date(data.createdAt) : new Date();
    this.updatedAt = data?.updatedAt ? new Date(data.updatedAt) : undefined;
    }
}
  