import { WelcomePage } from "./welcome.po";
import { browser } from "protractor";

// Arrange - Act - Assert

describe('WelcomePage', () => {
    // Arrange
    let page: WelcomePage;
    let urlWelcome: string = 'http://ec2-18-222-17-215.us-east-2.compute.amazonaws.com:4200/';
    let urlLogin: string = 'http://ec2-18-222-17-215.us-east-2.compute.amazonaws.com:4200/login';
    let urlRegister: string = 'http://ec2-18-222-17-215.us-east-2.compute.amazonaws.com:4200/register';

    beforeEach(() => {
        page = new WelcomePage();
        page.navigate();
    });

    it('deberia mostrar mensaje de bienvenida', async ()=> {
        // Act
        let head = await page.getHeadText();
        // Assert
        expect(head).toBe('502 PL Bienvenido!');
    });

    it('deberia navegar en /', async () => {
        // Act
        page.getLinkWelcome().click();
        let currentUrl = await browser.getCurrentUrl();
        // Assert
        expect(currentUrl).toBe(urlWelcome);
    });

    it('deberia navegar en /login', async () => {
        // Act
        page.getLinkLogin().click();
        let currentUrl = await browser.getCurrentUrl();
        // Assert
        expect(currentUrl).toBe(urlLogin);
    });

    it('deberia navegar en /register', async () => {
        // Act
        page.getLinkRegister().click();
        let currentUrl = await browser.getCurrentUrl();
        // Assert
        expect(currentUrl).toBe(urlRegister);
    });
});
