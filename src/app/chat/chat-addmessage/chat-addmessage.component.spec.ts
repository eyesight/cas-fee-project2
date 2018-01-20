import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatAddmessageComponent } from './chat-addmessage.component';
import {EmojiToUnicode} from '../../_services/emoji-to-unicode';
import {AlertMessagesService} from '../../_services/alert-messages.service';
import {AlertService} from '../../_services/alert.service';
import {RouterTestingModule} from '@angular/router/testing';

fdescribe('ChatAddmessageComponent', () => {
  let component: ChatAddmessageComponent;
  let fixture: ComponentFixture<ChatAddmessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatAddmessageComponent ],
      providers: [EmojiToUnicode, AlertService, AlertMessagesService],
      imports: [RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatAddmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
