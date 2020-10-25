import { browser, by, element } from "protractor";

export class WelcomePage {

    navigate() {
        return browser.get('/');
    }

    getHeadText() {
        return element(by.css('app-root h1')).getText();
    }

    getLinkWelcome() {
        return element(by.id('linkWelcome'));
    }

    getLinkLogin() {
        return element(by.id('linkLogin'));
    }

    getLinkRegister() {
        return element(by.id('linkRegister'));
    }
}
