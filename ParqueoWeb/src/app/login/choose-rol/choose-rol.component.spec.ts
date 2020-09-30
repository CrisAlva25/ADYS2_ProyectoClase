import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { RouterTestingModule } from '@angular/router/testing';

import { ChooseRolComponent } from './choose-rol.component';

describe('ChooseRolComponent', () => {
  let component: ChooseRolComponent;
  let fixture: ComponentFixture<ChooseRolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [AngularFireAuth, AngularFireAuthModule],
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig), RouterTestingModule.withRoutes([])],
      declarations: [ ChooseRolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
