import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { RestService } from 'src/app/servicios/rest.service';
import { Notify, getNotify } from "../../interface/solid/notify/Notify";

import { Singleton } from "../../interface/patrones/Singleton";
import { ICredential } from "../../interface/solid/usuario/ICredential";
import { UserFunction } from "../../interface/solid/usuario/User";

const REQUEST_ADDRESS = 'register';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    public notify: Notify;
    public usr: ICredential;

    @ViewChild('infoClose', { static: false }) infoClose: ElementRef;

    constructor(public auth: AuthService,
        public router: Router,
        public rest: RestService) { }

    ngOnInit(): void {
        this.notify = {};
        this.usr = { name: '', email: '', password: '', phone: '', photo: '', provider: '' }
    }

    async onRegisterFacebook() {
        // limpieza notify
        this.clearNotify();
        try {
            // obtener auth
            const { user } = await this.auth.authWithFacebook();
            // generar usr
            let usr = Singleton.getInstance().userFactory.createCredentialsRegister(user.displayName, user.email, user.uid, user.phoneNumber, user.photoURL, 'facebook');
            // register
            this.register(usr);
        } catch (error) {
            this.notify = getNotify(true, 'error', '', error.message);
        }
    }

    async onRegisterGoogle() {
        // limpieza notify
        this.clearNotify();
        try {
            // obtener auth
            const { user } = await this.auth.authWithGoogle();
            // generar usr
            let usr = Singleton.getInstance().userFactory.createCredentialsRegister(user.displayName, user.email, user.uid, user.phoneNumber, user.photoURL, 'google');
            // register
            this.register(usr);
        } catch (error) {
            this.notify = getNotify(true, 'error', '', error.message);
        }
    }

    checkFields(): boolean {
        if (!this.checkEmail()) {
            return false;
        }
        if (!this.checkEmailFormato()) {
            return false;
        }
        if (!this.checkPassword()) {
            return false;
        }
        return true;
    }

    checkEmail() {
        const { email } = this.usr;
        if (email === '') {
            this.notify = getNotify(true, 'error', '', 'Correo requerido');
            return false;
        }
        return true;
    }

    checkEmailFormato() {
        if (!UserFunction.checkEmailFormato(this.usr)) {
            this.notify = getNotify(true, 'error', '', 'Formato incorrecto en su direccion de correo electronico');
            return false;
        }
        return true;
    }

    checkPassword() {
        const { password } = this.usr;
        if (password === '') {
            this.notify = getNotify(true, 'error', '', 'Contraseña requerido');
            return false;
        }
        return true;
    }

    async onRegister() {
        // limpieza notify
        this.clearNotify();
        // revisar campos
        if (!this.checkFields())
            return;
        // register
        this.register(this.usr);
    }

    async register(user) {
        try {
            let usr = await this.rest.PostRequest(REQUEST_ADDRESS, user).toPromise();
            sessionStorage.setItem('user', JSON.stringify(usr));
            sessionStorage.setItem('navegacion', 'register');

            this.router.navigate(['/chooserol']);
        } catch (error) {
            this.notify = getNotify(true, 'error', '', (error.error) ? error.error : error.message);
        }
    }

    clearNotify() {
        this.notify.active = false;
    }
}
