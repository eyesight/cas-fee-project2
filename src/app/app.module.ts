import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChatMessageComponent } from './chat/chat-message/chat-message.component';
import { ChatAddmessageComponent } from './chat/chat-addmessage/chat-addmessage.component';
import { ChatThreadComponent } from './chat/chat-thread/chat-thread.component';
import { ClasslistItemComponent } from './classlist/classlist-item/classlist-item.component';
import { ClasslistListComponent } from './classlist/classlist-list/classlist-list.component';
import { ProfileAvatarComponent } from './profile/profile-avatar/profile-avatar.component';
import { ProfileFormComponent } from './profile/profile-form/profile-form.component';

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
