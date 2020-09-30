import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import { RouterTestingModule } from '@angular/router/testing';

import { MenubarInicioComponent } from './menubar-inicio.component';

describe('MenubarInicioComponent', () => {
  let component: MenubarInicioComponent;
  let fixture: ComponentFixture<MenubarInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [AngularFireAuth, AngularFireAuthModule],
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig), RouterTestingModule.withRoutes([])],
      declarations: [ MenubarInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenubarInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
