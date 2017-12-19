/**
 * Created by awedag on 23.11.17.
 */
import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {MockBackend} from "@angular/http/testing";
import {BaseRequestOptions, ConnectionBackend, Http, ResponseOptions} from "@angular/http";
import {HttpWrapperServiceMock} from "../_services/http-wrapper.service.mock";
import {UserAuthServiceMock} from "../_services/user-auth.service.mock";
import {UserAuthService} from "../_services/user-auth.service";
import {HttpWrapper} from "../_services/http-wrapper.service";
import {AuthenticationService} from "../_services/authentication.service";
import {ChatComponent} from "./chat.component";
import {RouterTestingModule} from "@angular/router/testing";
import {ProperTimePipe} from "./services/proper-time.pipe";
import {ChatAddmessageComponent} from "./chat-addmessage/chat-addmessage.component";
import {ChatDateComponent} from "./chat-date/chat-date.component";
import {ChatMessageComponent} from "./chat-message/chat-message.component";
import {FromNowPipe} from "./services/from-now.pipe";
import {ChatService} from "../_services/chat.service";
import {SocketWrapper} from "../_services/socket-wrapper.service";
import {AppConfigClass} from "../_helpers/app.config";
import {User} from "../_models/user.model";
import {Mock} from "protractor/built/driverProviders";
import {PersonalDetailsContainerComponent} from "../personal-details-container/personal-details-container.component";
import {AppScrollBottomDirective} from "../_directives/scroll-bottom.directive";
import {UserContentDbService} from "../_services/user-content-db.service";
import {UserContentDbServiceMock} from "../_services/user-content-db.service.mock";
import {StorageService} from "../_services/storage.service";
import {AlertService} from "../_services/alert.service";
import {ProfileService} from "../profile/service/profile.service";

fdescribe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatComponent, ProperTimePipe, FromNowPipe, ChatDateComponent, ChatMessageComponent, ChatAddmessageComponent, PersonalDetailsContainerComponent, AppScrollBottomDirective ],
      providers: [AuthenticationService, MockBackend, BaseRequestOptions, ChatService, SocketWrapper, AppConfigClass, StorageService, AlertService, ProfileService,
        {provide: HttpWrapper, useClass: HttpWrapperServiceMock},
        {provide: UserAuthService, useClass: UserAuthServiceMock},
        {provide: UserContentDbService, useClass: UserContentDbServiceMock},
        {provide: ConnectionBackend, useClass: MockBackend},
        {provide: Http, useFactory: (mockBackend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(mockBackend, defaultOptions);
        }, deps: [MockBackend, BaseRequestOptions]}
        ],
      imports: [RouterTestingModule.withRoutes([])]

    })
      .compileComponents();
  }));

  let mockBackend = MockBackend;
  let chatService = ChatService;
  let connectionBackend = MockBackend;
//  let chatComponent  = ChatComponent;
  beforeEach(inject([ MockBackend, ChatService, ConnectionBackend], (_MB, _CS, _CB) => {
    mockBackend = _MB;
    chatService = _CS;
    connectionBackend = _CB;
  //  chatComponent = _CC;
   //   this.backend = this.injector.get(ConnectionBackend) as MockBackend;
   //   connectionBackend = this.injector.get(ConnectionBackend) as MockBackend;

    })
  );


  it('should create', () => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should response ', (() => {
    let msgs = [{email:'es@com.ex', message: 'bla', sent_at: '2017-10-05T08:15:30-00:00'}];

//    const backend = this.injector.get(ConnectionBackend) as MockBackend;

   /* connectionBackend.connections.subscribe(connection => {
    const response = new ResponseOptions({body: JSON.stringify(msgs)});
    connection.mockRespond(new Response(response));
    });*/
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));
});
