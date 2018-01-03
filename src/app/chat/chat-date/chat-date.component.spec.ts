import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatDateComponent } from './chat-date.component';
import {FromNowPipe} from '../../_pipes/from-now.pipe';
import {MessageDateBlock} from '../../_models/message.model';
import * as moment from 'moment';
import _date = moment.unitOfTime._date;


fdescribe('ChatDateComponent', () => {
  let component: ChatDateComponent;
  let fixture: ComponentFixture<ChatDateComponent>;
  const today = new Date();
  const yesterday =  new Date(Date.now() + -1 * 24 * 3600 * 1000);
  const lastTuesday =  new Date('2017-11-21');

  const before2days = new Date(new Date().getTime() - 60 * 60 * 24 * 2 * 1000)
    , day = before2days.getDay()
    , diffToMonday = before2days.getDate() - day + (day === 0 ? -6 : 1)
    , lastMonday = new Date(before2days.setDate(diffToMonday))

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatDateComponent, FromNowPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatDateComponent);
    fixture.componentInstance.messageItem = new MessageDateBlock(today);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ', () => {
    expect(component).toBeTruthy();
  });
  it('should have correct date today: ' + today, () => {
    expect(fixture.nativeElement.querySelector('.zz-chat__date').textContent).toBe('Heute');
  });
  it('should have correct date yesterday: ' + yesterday, () => {
    fixture.componentInstance.messageItem = new MessageDateBlock(yesterday);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.zz-chat__date').textContent).toBe('Gestern') ;
  });
  it('should have correct date last Monday: ' + lastMonday, () => {
    console.log('lastMonday:' + new Date(lastMonday));
    fixture.componentInstance.messageItem = new MessageDateBlock(new Date(lastMonday));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.zz-chat__date').textContent).toBe('letzten Montag') ;
  });
});
