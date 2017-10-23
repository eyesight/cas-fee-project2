/**
 * Created by awedag on 17.10.17.
 */


export class Message {
  messageId: string;
  userName: string;
  klasseName: string;
  text: string;
  createdAt: string;
}

export class MessageItem {

  date: Date;
  dateGroup: Date;

  constructor(date: Date) {
    console.log('constructor of mi');
    this.date = date;
    // causes to truncate time
    this.dateGroup = new Date(date.toDateString());
  }

  messages: Message[];
}

