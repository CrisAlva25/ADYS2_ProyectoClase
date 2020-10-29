import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarInicioComponent } from './nav-bar-inicio.component';

describe('NavBarInicioComponent', () => {
  let component: NavBarInicioComponent;
  let fixture: ComponentFixture<NavBarInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
