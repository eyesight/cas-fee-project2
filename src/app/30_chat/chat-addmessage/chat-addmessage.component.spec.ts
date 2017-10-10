import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAddmessageComponent } from './chat-addmessage.component';

describe('ChatAddmessageComponent', () => {
  let component: ChatAddmessageComponent;
  let fixture: ComponentFixture<ChatAddmessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatAddmessageComponent ]
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
