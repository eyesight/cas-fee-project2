import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import { ChatMessage } from '../../_models/message.model';
import { UserClassListAvatars} from '../../_models/user.model';
import {ClasslistAvatarService} from '../../_services/user-classlist-avatars.service';
import {AlertService} from '../../_services/alert.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html'
})
export class ChatMessageComponent implements OnInit, OnDestroy {

  @Input()
  public message: ChatMessage;

  // get avatars directly from service instead of passing them over as parameters using @Input to this component which takes too long as
  // avatars contain lot of data
  public avatar: UserClassListAvatars = null;

  // classlist Avatars
  public  clavSub: Subscription = null;
  constructor( private classlistAvatarService: ClasslistAvatarService,
               private alertService: AlertService) { }

  public ngOnInit() {

    // allow other tasks to finish first, not to cause an warn message -> [Violation] 'load' handler took 239ms
    // SetTimeout causes that the task is executed after all others
    setTimeout(() => this.getAvatarFromEmail(this.message.email), 0);
  }

  public ngOnDestroy() {
    if (this.clavSub) { this.clavSub.unsubscribe(); }
  }

  private getAvatarFromEmail(email: string) {
    if (this.clavSub) { this.clavSub.unsubscribe(); }
    this.clavSub = this.classlistAvatarService.getClasslistAvatars().subscribe((resultAvatar) => {
      this.avatar = resultAvatar.find((x) => {
        if (!x || !x.email) {
          return false;
        }
        return x.email === email;
      });
    });
  }
}
