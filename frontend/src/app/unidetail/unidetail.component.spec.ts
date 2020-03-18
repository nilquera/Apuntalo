import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidetailComponent } from './unidetail.component';

describe('UnidetailComponent', () => {
  let component: UnidetailComponent;
  let fixture: ComponentFixture<UnidetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
