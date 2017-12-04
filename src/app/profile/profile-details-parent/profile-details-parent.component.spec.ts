import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDetailsParentComponent } from './profile-details-parent.component';

describe('ProfileDetailsParentComponent', () => {
  let component: ProfileDetailsParentComponent;
  let fixture: ComponentFixture<ProfileDetailsParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileDetailsParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDetailsParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
