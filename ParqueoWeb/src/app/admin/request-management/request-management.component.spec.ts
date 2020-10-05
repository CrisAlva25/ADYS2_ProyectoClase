import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from "@angular/forms";

import { RequestManagementComponent } from './request-management.component';

describe('RequestManagementComponent', () => {
  let component: RequestManagementComponent;
  let fixture: ComponentFixture<RequestManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule ,HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ RequestManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
