import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ChatMessageComponent } from './30_chat/chat-message/chat-message.component';
import { ChatAddmessageComponent } from './30_chat/chat-addmessage/chat-addmessage.component';
import { ChatThreadComponent } from './30_chat/chat-thread/chat-thread.component';
import { ClasslistItemComponent } from './20_classlist/classlist-item/classlist-item.component';
import { ClasslistListComponent } from './20_classlist/classlist-list/classlist-list.component';
import { ProfileAvatarComponent } from './10_profile/profile-avatar/profile-avatar.component';
import { ProfileFormComponent } from './10_profile/profile-form/profile-form.component';
import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatMessageComponent,
    ChatAddmessageComponent,
    ChatThreadComponent,
    ClasslistItemComponent,
    ClasslistListComponent,
    ProfileAvatarComponent,
    ProfileFormComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
