import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenubarInicioComponent } from './menubar-inicio.component';

describe('MenubarInicioComponent', () => {
  let component: MenubarInicioComponent;
  let fixture: ComponentFixture<MenubarInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenubarInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenubarInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
