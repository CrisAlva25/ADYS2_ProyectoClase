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
            declarations: [RegisterComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        usr = { name: 'admin', email: 'admin@test.com', password: 'test', phone: '49960811', photo: '', provider: '' };
        fixture.detectChanges();
    });

    afterEach(() => {
        sessionStorage.clear();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('deberia validar email existe', () => {
        expect(component.checkEmail()).toBeFalsy();
        component.usr.email = usr.email;
        expect(component.checkEmail()).toBeTruthy();
    });

    it('deberia validar formato email', () => {
        expect(component.checkEmailFormato()).toBeFalsy();
        component.usr.email = usr.email;
        expect(component.checkEmailFormato()).toBeTruthy();
    });

    it('deberia validar password existe', () => {
        expect(component.checkPassword()).toBeFalsy();
        component.usr.password = usr.password;
        expect(component.checkPassword()).toBeTruthy();
    });

    it('deberia validar todos los campos', () => {
        expect(component.checkFields()).toBeFalsy();
        component.usr.email = usr.email;
        expect(component.checkFields()).toBeFalsy();
        component.usr.password = usr.password;
        expect(component.checkFields()).toBeTruthy();
    });

    it('void', () => {
        component.onRegister();
        component.register(null);
    })
});
