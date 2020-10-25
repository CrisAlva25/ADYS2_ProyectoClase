import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { RestService } from 'src/app/servicios/rest.service';
import { getNotify, Notify } from "../../interface/solid/notify/Notify";

import { Singleton } from "../../interface/patrones/Singleton";
import { ICredential } from "../../interface/solid/usuario/ICredential";
import { UserFunction } from "../../interface/solid/usuario/User";
import { Title } from '@angular/platform-browser';

const REQUEST_LOGIN = 'login';
const REQUEST_PARK = 'get-parking';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public notify: Notify;
    public usr: ICredential;

    constructor(//private titleService: Title,
        public auth: AuthService,
        public router: Router,
        public rest: RestService) { }

    ngOnInit(): void {
        //this.titleService.setTitle("Login - 502PL");
        this.notify = {};
        this.usr = { email: '', password: '', provider: ''}
    }

    async onLoginFacebook() {
        // limpieza notify
        this.clearNotify();
        try {
            // obtener pass ingresado
            const { password } = this.usr;
            // obtener auth
            const { user } = await this.auth.authWithFacebook();
            // generar usr
            this.usr = Singleton.getInstance().userFactory.createCredentialsLogin(user.email, password, 'facebook');
            // login
            this.login();
        } catch (error) {
            console.log(error);
            this.notify = getNotify(true, 'error', '', error.message);
        }
    }

    async onLoginGoogle() {
        // limpieza notify
        this.clearNotify();
        try {
            // obtener pass ingresado
            const { password } = this.usr;
            // obtener auth
            const { user } = await this.auth.authWithGoogle();
            // generar usr
            this.usr = Singleton.getInstance().userFactory.createCredentialsLogin(user.email, password, 'google');
            // login
            this.login();
        } catch (error) {
            console.log(error);
            this.notify = getNotify(true, 'error', '', error.message);
        }
    }

    checkFields(): boolean {
        if (!this.checkEmail) {
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

    onLoginEmail() {
        this.clearNotify();
        if (!this.checkFields())
            return;
        this.usr.provider = 'email';
        this.login();
    }

    async login() {
        try {
            let usr = await this.rest.PostRequest(REQUEST_LOGIN, this.usr).toPromise();
            sessionStorage.setItem('user', JSON.stringify(usr));
            sessionStorage.setItem('navegacion', 'login');

            if (usr.rol === null) {
                this.router.navigate(['/chooserol']);

            } else if (usr.rol === 'admin') {
                this.router.navigate(['/admin']);

            } else if (usr.rol === 'owner') {
                let park = await this.rest.PostRequest(REQUEST_PARK, usr).toPromise();
                if (park.authorized) {
                    this.router.navigate(['/dashboard']);
                } else {
                    this.router.navigate(['/followup']);
                }

            } else {
                this.router.navigate(['/dashboard']);
            }
        } catch (error) {
            console.log(error);
            this.notify = getNotify(true, 'error', '', (error.error) ? error.error : error.message);
        }
    }

    clearNotify() {
        this.notify.active = false;
    }
}
