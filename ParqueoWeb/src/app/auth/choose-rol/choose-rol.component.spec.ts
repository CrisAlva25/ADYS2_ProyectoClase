import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from "@angular/forms";

import { ChooseRolComponent } from './choose-rol.component';

describe('ChooseRolComponent', () => {
  let component: ChooseRolComponent;
  let fixture: ComponentFixture<ChooseRolComponent>;
  let usr: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ ChooseRolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseRolComponent);
    component = fixture.componentInstance;
    usr = {id: "5f7e4daf05745d242056eebf", email: 'test2@test.com'};
    fixture.detectChanges();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia crear notify default', () => {
    expect(component.notify).toBeDefined();
  });

  it('deberia estar desactivado notify', () => {
    expect(component.notify.active).toBeFalsy();
  });

  it('deberia cambiar rol owner', () => {
    component.onOwner();
    expect(component.rol).toEqual('owner');
  });

  it('deberia cambiar rol regular', () => {
    component.onRegular();
    expect(component.rol).toEqual('regular');
  });

  it('deberia iniciar sesion', () => {
    component.onConfirm();
    component.user = usr;
    component.rol = "regular";
    component.onConfirm();
    expect(component.user).toBeDefined();
  });
});
