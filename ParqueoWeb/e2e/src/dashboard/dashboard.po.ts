import { browser, by, element } from "protractor";

export class DashBoardPage {

    navigate(url) {
        return browser.get('/' + url);
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

    getHeadText() {
        return element(by.css('app-root h1')).getText();
    }

    getLinkParqueos() {
        return element(by.id('linkParqueos'));
    }

    getLinkNoticias() {
        return element(by.id('linkNoticias'));
    }

    getLogOutButton() {
        return element(by.id('logoutButton'));
    }
}
