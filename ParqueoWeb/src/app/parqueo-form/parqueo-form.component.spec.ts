import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParqueoFormComponent } from './parqueo-form.component';

describe('ParqueoFormComponent', () => {
  let component: ParqueoFormComponent;
  let fixture: ComponentFixture<ParqueoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParqueoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParqueoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
