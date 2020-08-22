import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginParqueoAdminPage } from './login-parqueo-admin.page';

describe('LoginParqueoAdminPage', () => {
  let component: LoginParqueoAdminPage;
  let fixture: ComponentFixture<LoginParqueoAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginParqueoAdminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginParqueoAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
