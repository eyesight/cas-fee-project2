import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDetailsContainerComponent } from './personal-details-container.component';

describe('PersonalDetailsContainerComponent', () => {
  let component: PersonalDetailsContainerComponent;
  let fixture: ComponentFixture<PersonalDetailsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalDetailsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
