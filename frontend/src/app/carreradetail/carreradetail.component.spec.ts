import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarreradetailComponent } from './carreradetail.component';

describe('CarreradetailComponent', () => {
  let component: CarreradetailComponent;
  let fixture: ComponentFixture<CarreradetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarreradetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarreradetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
