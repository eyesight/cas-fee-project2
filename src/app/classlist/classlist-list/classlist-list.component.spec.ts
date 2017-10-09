import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasslistListComponent } from './classlist-list.component';

describe('ClasslistListComponent', () => {
  let component: ClasslistListComponent;
  let fixture: ComponentFixture<ClasslistListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasslistListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasslistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
