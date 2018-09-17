import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineExamMainComponent } from './online-exam-main.component';

describe('OnlineExamMainComponent', () => {
  let component: OnlineExamMainComponent;
  let fixture: ComponentFixture<OnlineExamMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineExamMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineExamMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
