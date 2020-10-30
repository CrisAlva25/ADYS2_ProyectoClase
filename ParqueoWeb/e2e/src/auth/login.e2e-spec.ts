import { LoginPage } from './login.po';
import { browser } from 'protractor';

// Arrange - Act - Assert

describe('LoginPage', () => {
    // Arrange
    let page: LoginPage;
    let usrAdmin: string = 'admin@test.com';
    let usrRegular: string = 'regular@test.com';
    let usrOwner: string = 'owner@test.com';
    let password: string = '123';
    let urlAdmin: string = 'http://localhost:4200/admin';
    let urlRegular: string = 'http://localhost:4200/dashboard';
    let urlOwner: string = 'http://localhost:4200/followup';
    let urlRegister: string = 'http://localhost:4200/register';
    beforeEach(() => {
        page = new LoginPage();
        page.navigateTo();
    });

    it('deberia mostrar mensaje de bienvenida', async ()=> {
        // Act
        let head = await page.getHeadText();
        // Assert
        expect(head).toBe('502PL Iniciar Sesion');
    });

    it('deberia navegar en /register', async () => {
        // Act
        page.getRegisterButton().click();
        let currentUrl = await browser.getCurrentUrl();
        // Assert
        expect(currentUrl).toBe(urlRegister);
    });

    it('deberia iniciar sesion un usuario admin', async () => {
        // Act
        page.getEmailField().sendKeys(usrAdmin);
        page.getPasswordField().sendKeys(password);
        page.getLoginButton().click();
        let currentUrl = await browser.getCurrentUrl();
        // Assert
        expect(currentUrl).toBe(urlAdmin);
    });

    it('deberia iniciar sesion un usuario owner', async () => {
        // Act
        page.getEmailField().sendKeys(usrOwner);
        page.getPasswordField().sendKeys(password);
        page.getLoginButton().click();
        let currentUrl = await browser.getCurrentUrl();
        // Assert
        expect(currentUrl).toBe(urlOwner);
    });

    it('deberia iniciar sesion un usuario regular', async () => {
        // Act
        page.getEmailField().sendKeys(usrRegular);
        page.getPasswordField().sendKeys(password);
        page.getLoginButton().click();
        let currentUrl = await browser.getCurrentUrl();
        // Assert
        expect(currentUrl).toBe(urlRegular);
    });

    it('deberia estar presente el inicio con red social', async () => {
        // Act
        let presentFacebook = await page.getFacebookButton().isPresent();
        let presentGoogle = await page.getGoogleButton().isPresent();
        // Assert
        expect(presentFacebook).toBeTruthy();
        expect(presentGoogle).toBeTruthy();
    });

    it('deberia estar presente una alerta', async () => {
        // Act
        usrRegular = "test";
        page.getEmailField().sendKeys(usrRegular);
        page.getPasswordField().sendKeys(password);
        page.getLoginButton().click();
        let presentAlert = await page.getAlert().isPresent();
        // Assert
        expect(presentAlert).toBeTruthy();
    });
});
