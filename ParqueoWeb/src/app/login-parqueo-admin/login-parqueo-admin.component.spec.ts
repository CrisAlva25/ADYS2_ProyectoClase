import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginParqueoAdminComponent } from './login-parqueo-admin.component';

describe('LoginParqueoAdminComponent', () => {
  let component: LoginParqueoAdminComponent;
  let fixture: ComponentFixture<LoginParqueoAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginParqueoAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginParqueoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
