import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineFormComponent } from './online-form.component';

describe('OnlineFormComponent', () => {
  let component: OnlineFormComponent;
  let fixture: ComponentFixture<OnlineFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
