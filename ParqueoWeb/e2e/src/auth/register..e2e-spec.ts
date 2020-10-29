import { RegisterPage } from './register.po';
import { browser } from 'protractor';

// Arrange - Act - Assert

describe('RegisterPage', () => {
    // Arrange
    let page: RegisterPage;
    let usrRegular: string = 'regular@test.com';
    let password: string = '123';
    let urlLogin: string = 'http://localhost:4200/login';
    beforeEach(() => {
        page = new RegisterPage();
        page.navigateTo();
    });

    it('deberia mostrar mensaje de bienvenida', async ()=> {
        // Act
        let head = await page.getHeadText();
        // Assert
        expect(head).toBe('502PL Registrar');
    });

    it('deberia navegar en /login', async () => {
        // Act
        page.getLoginButton().click();
        let currentUrl = await browser.getCurrentUrl();
        // Assert
        expect(currentUrl).toBe(urlLogin);
    });

    it('no deberia registrar un usuario', async () => {
        // Act
        page.getEmailField().sendKeys(usrRegular);
        page.getPasswordField().sendKeys(password);
        page.getRegisterButton().click();
        let presentAlert = await page.getAlert().isPresent();
        // Assert
        expect(presentAlert).toBeTruthy();
    });

    it('deberia estar presente el inicio con red social', async () => {
        // Act
        let presentFacebook = await page.getFacebookButton().isPresent();
        let presentGoogle = await page.getGoogleButton().isPresent();
        // Assert
        expect(presentFacebook).toBeTruthy();
        expect(presentGoogle).toBeTruthy();
    });
});
