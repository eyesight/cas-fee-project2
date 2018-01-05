
export class Message {
  messageId: string;
  userName: string;
  klasseName: string;
  text: string;
  createdAt: string;
}

export class MessageJson {
  client_uuid: number;
  email: string;
  message: string;
  sent_at: string;
  success: boolean;
  saved_at: string;

  constructor() {}

 // json cant have an methods!
}

export class MessageCallback {
  server_saved_at: string;

}
export class MessageDateBlock {

  date: Date;
  dateGroup: Date;
  messages: MessageJson[];

  constructor(date: Date) {
    console.log('constructor of mi');
    this.date = date;
    // causes to truncate time
    this.dateGroup = new Date(date.toDateString());
  }


}

