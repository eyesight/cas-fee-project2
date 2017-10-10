import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChatMessageComponent } from './30_chat/chat-message/chat-message.component';
import { ChatAddmessageComponent } from './30_chat/chat-addmessage/chat-addmessage.component';
import { ChatThreadComponent } from './30_chat/chat-thread/chat-thread.component';
import { ClasslistItemComponent } from './classlist/classlist-item/classlist-item.component';
import { ClasslistListComponent } from './classlist/classlist-list/classlist-list.component';
import { ProfileAvatarComponent } from './10_profile/profile-avatar/profile-avatar.component';
import { ProfileFormComponent } from './10_profile/profile-form/profile-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatMessageComponent,
    ChatAddmessageComponent,
    ChatThreadComponent,
    ClasslistItemComponent,
    ClasslistListComponent,
    ProfileAvatarComponent,
    ProfileFormComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
