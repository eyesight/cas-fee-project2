import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChatMessageComponent} from './chat-message.component';
import {ProperTimePipe} from "../services/proper-time.pipe";
import {ChatMessage} from "../../_models/message.model";
import {
  ClasslistAvatarServiceMock
} from "../../_services/user-classlist-avatars.service.mock";
import {ClasslistAvatarService, DbServiceClasslistAvatar} from "../../_services/user-classlist-avatars.service";
import {AlertMessagesService} from "../../_services/alert-messages.service";
import {AlertService} from "../../_services/alert.service";
import {UserAuthServiceMock} from "../../_services/user-auth.service.mock";
import {HttpWrapper} from "../../_services/http-wrapper.service";
import {UserAuthService} from "../../_services/user-auth.service";
import {HttpWrapperServiceMock} from "../../_services/http-wrapper.service.mock";
import {BaseRequestOptions, ConnectionBackend, Http} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {StorageService} from "../../_services/storage.service";
import {UserContentDbServiceMock} from "../../_services/user-content-db.service.mock";
import {DbServiceUserContent, UserContentService} from "../../_services/user-content.service";
import {RouterTestingModule} from "@angular/router/testing";
import {UserContentServiceMock} from "../../_services/user-content.service.mock";

fdescribe('ChatMessageComponent', () => {
  let component: ChatMessageComponent;
  let fixture: ComponentFixture<ChatMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatMessageComponent, ProperTimePipe],
      providers: [AlertService, AlertMessagesService, MockBackend, BaseRequestOptions, DbServiceClasslistAvatar,
        StorageService, UserContentDbServiceMock, DbServiceUserContent,
        {provide: HttpWrapper, useClass: HttpWrapperServiceMock},
        {provide: UserAuthService, useClass: UserAuthServiceMock},
        {provide: UserContentService, useClass: UserContentServiceMock },
        {provide: ClasslistAvatarService, useClass: ClasslistAvatarServiceMock },
        {provide: ConnectionBackend, useClass: MockBackend},
        {
          provide: Http, useFactory: (mockBackend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(mockBackend, defaultOptions);
        }, deps: [MockBackend, BaseRequestOptions]
        }
      ],
      imports: [RouterTestingModule.withRoutes([])]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageComponent);
    component = fixture.componentInstance;
    fixture.componentInstance.message = new ChatMessage();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
