import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from "@angular/forms";

import { FollowUpComponent } from './follow-up.component';

describe('FollowUpComponent', () => {
  let component: FollowUpComponent;
  let fixture: ComponentFixture<FollowUpComponent>;
  //let usr: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule, AngularFireModule.initializeApp(environment.firebaseConfig), RouterTestingModule.withRoutes([])],
      declarations: [ FollowUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowUpComponent);
    component = fixture.componentInstance;
    //usr = { idParking: '5f7e4da305745d242056eebe', photo: null };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('metodos void', () => {
    component.showPreview(null, 1);
    component.uploadPhoto(-1);
    expect(true).toBeTruthy();
  });

  it('deberia checkear agree terms', () => {
    component.isChecked = true;
    component.agreeToTermsAndConditions();
    expect(component.notify.active).toBeFalsy();
    component.isChecked = false;
    component.agreeToTermsAndConditions();
    expect(component.notify.active).toBeTruthy();
  });
});
