import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../_services/chat.service';
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
  providers: [ChatService]
})
export class ChatModule { }

