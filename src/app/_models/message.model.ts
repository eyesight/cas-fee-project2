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

export class MessageJson {
  client_uuid: string;
  email: string;
  message: string;
  sent_at: string;
  saved_at: string;
}

export class MessageDateBlock {

  date: Date;
  dateGroup: Date;

  constructor(date: Date) {
    console.log('constructor of mi');
    this.date = date;
    // causes to truncate time
    this.dateGroup = new Date(date.toDateString());
  }

  messages: MessageJson[];
}

