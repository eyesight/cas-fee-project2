import {async, fakeAsync, ComponentFixture, TestBed, tick} from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { AlertService } from '../../_services/alert.service';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertComponent ],
      providers: [AlertService],
      imports: [RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));
  // const alertservice = new AlertService;

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
    alertService.success('got it');
    tick(7500);
    fixture.detectChanges();
    const waiter = fixture.nativeElement.querySelector('.zz-alertbox--success').innerText;
    tick(7500);
    expect(waiter).toEqual('success got it');
  }));
});
