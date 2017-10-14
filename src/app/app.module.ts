import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ChatComponent } from './30_chat/chat.component';
import { ChatMessageComponent } from './30_chat/chat-message/chat-message.component';
import { ChatAddmessageComponent } from './30_chat/chat-addmessage/chat-addmessage.component';
import { ChatThreadComponent } from './30_chat/chat-thread/chat-thread.component';

import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingKKModule} from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
  /*  ChatComponent,
    ChatMessageComponent,
    ChatAddmessageComponent,
    ChatThreadComponent,*/
    NavComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingKKModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
