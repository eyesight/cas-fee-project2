/**
 * Created by awedag on 12.10.17.
 */
import { Component, OnInit } from '@angular/core';
import { Klasse } from '../model/klasse.model';
import { MessageItemService } from '../services/messageItem.service';
import { MessageItem} from '../model/messageItem.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

  public messageItem: MessageItem[];

  constructor( private messageItemService: MessageItemService) { }

  ngOnInit() {
    this.messageItemService.load()
      .subscribe((result) => {this.messageItem = result;
    console.log('component.ngOnInit:'+this.messageItem)});
  }

}
