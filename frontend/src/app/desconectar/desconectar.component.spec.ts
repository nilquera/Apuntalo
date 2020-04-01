import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesconectarComponent } from './desconectar.component';

describe('DesconectarComponent', () => {
  let component: DesconectarComponent;
  let fixture: ComponentFixture<DesconectarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesconectarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesconectarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
