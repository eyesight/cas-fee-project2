import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageItemService } from '../services/messageItem.service';
import { ChatAddmessageComponent } from './chat-addmessage/chat-addmessage.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatDateComponent } from './chat-date/chat-date.component';
import { ChatThreadComponent } from './chat-thread/chat-thread.component';
import { ChatComponent } from './chat.component';
import { ChatRoutesModule } from './chat.routes';
import { FromNowPipe } from './services/fromNow.pipe';

@NgModule({
  imports: [
    CommonModule, ChatRoutesModule
  ],
  declarations: [ChatComponent, ChatAddmessageComponent, ChatMessageComponent, ChatThreadComponent, ChatDateComponent, FromNowPipe],
  providers: [MessageItemService]
})
export class ChatModule { }

