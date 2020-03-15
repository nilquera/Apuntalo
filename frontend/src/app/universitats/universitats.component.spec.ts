import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversitatsComponent } from './universitats.component';

describe('UniversitatsComponent', () => {
  let component: UniversitatsComponent;
  let fixture: ComponentFixture<UniversitatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversitatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversitatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
