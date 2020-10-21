import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';

import { ReportUserComponent } from './report-user.component';

describe('ReportUserComponent', () => {
    let component: ReportUserComponent;
    let fixture: ComponentFixture<ReportUserComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule ,HttpClientTestingModule, RouterTestingModule.withRoutes([]), AngularFireModule.initializeApp(environment.firebaseConfig)],
            declarations: [ReportUserComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReportUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
