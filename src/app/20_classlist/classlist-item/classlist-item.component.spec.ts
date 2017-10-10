import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasslistItemComponent } from './classlist-item.component';

describe('ClasslistItemComponent', () => {
  let component: ClasslistItemComponent;
  let fixture: ComponentFixture<ClasslistItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasslistItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasslistItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
