import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDetailsChildComponent } from './profile-details-child.component';

describe('ProfileDetailsChildComponent', () => {
  let component: ProfileDetailsChildComponent;
  let fixture: ComponentFixture<ProfileDetailsChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileDetailsChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDetailsChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
