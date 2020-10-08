import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from "@angular/forms";

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let usr: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [AngularFireAuth, AngularFireAuthModule],
      imports: [FormsModule, HttpClientTestingModule, AngularFireModule.initializeApp(environment.firebaseConfig), RouterTestingModule.withRoutes([])],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    usr = {name: 'test', email: 'test@test.com', password: 'test', phone: '49960811', photo: '', provider: ''};
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

  it('deberia crear usuario default', () => {
    expect(component.usuario).toBeDefined();
  });

  it('deberia crear objeto usuario', () => {
    let usr_tmp = component.getUsuario('', '', '', '', '', '');
    expect(usr_tmp).toBeDefined();
  });

  it('deberia validar email existe', () => {
    expect(component.checkEmail()).toBeFalsy();
    component.usuario.email = usr.email;
    expect(component.checkEmail()).toBeTruthy();
  });

  it('deberia validar formato email', () => {
    expect(component.checkEmailFormato()).toBeFalsy();
    component.usuario.email = usr.email;
    expect(component.checkEmailFormato()).toBeTruthy();
  });

  it('deberia validar password existe', () => {
    expect(component.checkPassword()).toBeFalsy();
    component.usuario.password = usr.password;
    expect(component.checkPassword()).toBeTruthy();
  });

  it('deberia validar todos los campos', () => {
    expect(component.checkFields()).toBeFalsy();
    component.usuario.email = usr.email;
    expect(component.checkFields()).toBeFalsy();
    component.usuario.password = usr.password;
    expect(component.checkFields()).toBeTruthy();
  });

  it('deberia revisar onRegister', () => {
    component.onRegister();
    expect(component.notify.active).toBeTruthy();
    component.usuario.email = usr.email;
    component.usuario.password = usr.password;
    component.onRegister();
    expect(component.notify.active).toBeTruthy();
  });

  /*it('deberia encontrar error existe user', () => {
    component.usuario.email = usr.email;
    component.usuario.password = usr.password;
    component.register(component.usuario);
  });*/
});
