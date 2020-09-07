import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginParqueoComponent } from './login-parqueo.component';

describe('LoginParqueoComponent', () => {
  let component: LoginParqueoComponent;
  let fixture: ComponentFixture<LoginParqueoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginParqueoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginParqueoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
