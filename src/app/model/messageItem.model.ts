/**
 * Created by awedag on 17.10.17.
 */


export interface Message {
  messageId: string;
  userName: string;
  klasseName: string;
  text: string;
  createdAt: string;
}

export interface MessageItem {
  date: Date;
  messages: Message[];
}
