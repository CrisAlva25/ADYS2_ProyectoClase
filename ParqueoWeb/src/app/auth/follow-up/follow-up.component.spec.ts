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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
