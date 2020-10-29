import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPromocionesComponent } from './listar-promociones.component';

describe('ListarPromocionesComponent', () => {
  let component: ListarPromocionesComponent;
  let fixture: ComponentFixture<ListarPromocionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarPromocionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPromocionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
