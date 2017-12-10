import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEmailChangeComponent } from './profile-email-change.component';

describe('ProfileEmailChangeComponent', () => {
  let component: ProfileEmailChangeComponent;
  let fixture: ComponentFixture<ProfileEmailChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileEmailChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEmailChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
