
export class ChatMessage {
  client_uuid: number;
  email: string;
  message: string;
  sent_at: string;
  success: boolean;
  saved_at: string;

 // json cant have an methods!
}

export class MessageCallback {
  server_saved_at: string;

}
export class MessageDateBlock {

  date: Date;
  dateGroup: Date;
  messages: ChatMessage[];

  constructor(date: Date) {
    console.log('constructor of mi');
    this.date = date;
    // causes to truncate time
    this.dateGroup = new Date(date.toDateString());
  }


}

