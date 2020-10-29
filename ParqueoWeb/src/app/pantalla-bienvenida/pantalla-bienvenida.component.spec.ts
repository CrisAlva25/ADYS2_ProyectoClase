import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaBienvenidaComponent } from './pantalla-bienvenida.component';

describe('PantallaBienvenidaComponent', () => {
  let component: PantallaBienvenidaComponent;
  let fixture: ComponentFixture<PantallaBienvenidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PantallaBienvenidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PantallaBienvenidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
