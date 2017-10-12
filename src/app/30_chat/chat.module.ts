import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatAddmessageComponent } from './chat-addmessage/chat-addmessage.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatThreadComponent } from './chat-thread/chat-thread.component';
import { ChatComponent } from './chat.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ChatComponent, ChatAddmessageComponent, ChatMessageComponent, ChatThreadComponent]
})
export class ChatModule { }
