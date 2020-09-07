import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterParqueoComponent } from './register-parqueo.component';

describe('RegisterParqueoComponent', () => {
  let component: RegisterParqueoComponent;
  let fixture: ComponentFixture<RegisterParqueoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterParqueoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterParqueoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
