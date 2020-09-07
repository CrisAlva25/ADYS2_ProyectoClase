import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarUsuarioComponent } from './verificar-usuario.component';

describe('VerificarUsuarioComponent', () => {
  let component: VerificarUsuarioComponent;
  let fixture: ComponentFixture<VerificarUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificarUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
