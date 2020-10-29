import { browser, by, element } from 'protractor';

export class LoginPage {

    navigateTo() {
        return browser.get('/login');
    }

    getHeadText() {
        return element(by.css('app-root h3')).getText();
    }

    getFacebookButton() {
        return element(by.id('facebookButton'));
    }

    getGoogleButton() {
        return element(by.id('googleButton'));
    }

    getAlert() {
        return element(by.id('alertDanger'));
    }

    getEmailField() {
        return element(by.id('inputEmail'));
    }

    getPasswordField() {
        return element(by.id('inputPassword'));
    }

    getLoginButton() {
        return element(by.id('loginButton'));
    }

    getRegisterButton() {
        return element(by.id('registerButton'));
    }

}
