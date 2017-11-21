import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../_services/chat.service';
import { ChatAddmessageComponent } from './chat-addmessage/chat-addmessage.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatDateComponent } from './chat-date/chat-date.component';
import { ChatThreadComponent } from './chat-thread/chat-thread.component';
import { ChatComponent } from './chat.component';
import { ChatRoutesModule } from './chat.routes';
import { FromNowPipe } from './services/from-now.pipe';
import { ProperTimePipe } from './services/proper-time.pipe';

import { DirectivesModule } from '../_directives/directives.module';
import {SocketWrapper} from '../_services/socket-wrapper.service';

@NgModule({
  imports: [
    CommonModule, ChatRoutesModule, DirectivesModule
  ],
  declarations: [ChatComponent, ChatAddmessageComponent, ChatMessageComponent,
    ChatThreadComponent, ChatDateComponent, FromNowPipe, ProperTimePipe],
  providers: [ChatService, SocketWrapper]
})
export class ChatModule { }

