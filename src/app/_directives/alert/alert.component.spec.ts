import {async, fakeAsync, ComponentFixture, TestBed, tick} from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { AlertService } from '../../_services/alert.service';
import { AlertMessagesService } from '../../_services/alert-messages.service';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertComponent ],
      providers: [AlertService, AlertMessagesService],
      imports: [RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return success-message', fakeAsync(() => {
    const alertService: AlertService = fixture.debugElement.injector.get(AlertService);
    console.log('fixture.debugElement.injector.get(AlertMessagesService');
    const alertMessagesService: AlertMessagesService = fixture.debugElement.injector.get(AlertMessagesService);
    alertService.success(alertMessagesService.MessagesSuccess.register);
    tick(7500);
    fixture.detectChanges();
    const waiter = fixture.nativeElement.querySelector('.zz-alertbox--success').innerText;
    tick(7500);
    expect(waiter).toEqual('Registrierung war erfolgreich');
  }));
});
