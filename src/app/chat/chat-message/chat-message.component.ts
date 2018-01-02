import { Component, OnInit, Input } from '@angular/core';

import { MessageDateBlock, Message, MessageJson } from '../../_models/message.model';
import { Klasse } from '../../_models/klasse.model';
import { UserClassListAvatars} from '../../_models/user.model';
import {ClasslistAvatarService} from "../../_services/user-classlist-avatars.service";
import {AlertService} from "../../_services/alert.service";
import {UserContentService} from "../../_services/user-content.service";


@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html'
})
export class ChatMessageComponent implements OnInit {

  @Input()
  public message: MessageJson;

  // get them directly here - otherwise we need to pass them over @Input to this component and that takes too long as
  // avatars contain lot of data
  public avatar: UserClassListAvatars = null;

   constructor( private classlistAvatarService: ClasslistAvatarService,
                private alertService: AlertService) { }

  ngOnInit() {
  //  console.log('asd:' + this.avatar.email);

    // allow other tasks to finish first, not to cause an warn message -> [Violation] 'load' handler took 239ms
    // SetTimeout causes that the task is executed after all others
    setTimeout(() =>
    this.classlistAvatarService.getAvatarFromEmail(this.message.email)
      .then((resultAvatar) => {
          this.avatar =  resultAvatar;
      //    this.avatar.avatar = 'data:image/png;base64,' + resultAvatar.avatar;
          //console.log('avatar?:' + !!this.avatar);
        },
        (error) => {
          console.log('getClasslistAvatars: error:' );
          this.alertService.error('avatarNotLoaded');
        })
  , 0);

  }
}
