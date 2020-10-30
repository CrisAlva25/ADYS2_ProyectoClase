import { DashBoardPage } from "./dashboard.po";
import { browser } from "protractor";

//park@test.com
//regular@test.com

// Arrange - Act - Assert

describe('DashBoardPage', () => {
    // Arrange
    let page: DashBoardPage;
    let usrRegular: string = 'regular@test.com';
    let password: string = '123';
    let urlWelcome: string = 'http://ec2-18-222-17-215.us-east-2.compute.amazonaws.com:4200/';
    let urlParqueo: string = 'http://ec2-18-222-17-215.us-east-2.compute.amazonaws.com:4200/dashboard';
    let urlNoticias: string = 'http://ec2-18-222-17-215.us-east-2.compute.amazonaws.com:4200/noticias';

    beforeEach(() => {
        page = new DashBoardPage();
        page.navigate('login');
        page.getPasswordField().sendKeys(usrRegular);
        page.getPasswordField().sendKeys(password);
        page.getLoginButton().click();
        page.navigate('dashboard');
    });

    it('deberia mostrar mensaje de bienvenida', async ()=> {
        // Act
        let head = await page.getHeadText();
        // Assert
        expect(head).toBe('502 ParkingLot');
    });

    it('deberia navegar en /dashboard', async () => {
        // Act
        page.getLinkParqueos().click();
        let currentUrl = await browser.getCurrentUrl();
        // Assert
        expect(currentUrl).toBe(urlParqueo);
    });

    it('deberia navegar en /noticias', async () => {
        // Act
        page.getLinkNoticias().click();
        let currentUrl = await browser.getCurrentUrl();
        // Assert
        expect(currentUrl).toBe(urlNoticias);
    });

    it('deberia cerrar session', async () => {
        // Act
        page.getLogOutButton().click();
        let currentUrl = await browser.getCurrentUrl();
        // Assert
        expect(currentUrl).toBe(urlWelcome);
    });
});
