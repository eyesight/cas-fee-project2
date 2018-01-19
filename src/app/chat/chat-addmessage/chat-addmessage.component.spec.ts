import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAddmessageComponent } from './chat-addmessage.component';
import {EmojiToUnicode} from "../../shared/emoji-to-unicode";

fdescribe('ChatAddmessageComponent', () => {
  let component: ChatAddmessageComponent;
  let fixture: ComponentFixture<ChatAddmessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatAddmessageComponent ],
      providers: [EmojiToUnicode]
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
