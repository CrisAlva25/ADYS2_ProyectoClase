import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from "@angular/forms";

import { ChooseRolComponent } from './choose-rol.component';

describe('ChooseRolComponent', () => {
    let component: ChooseRolComponent;
    let fixture: ComponentFixture<ChooseRolComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, HttpClientTestingModule, RouterTestingModule.withRoutes([])],
            declarations: [ChooseRolComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChooseRolComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        sessionStorage.clear();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('deberia cambiar rol owner', () => {
        component.onOwner();
        expect(component.rol).toEqual('owner');
    });

    it('deberia cambiar rol regular', () => {
        component.onRegular();
        expect(component.rol).toEqual('regular');
    });

    it('void', () => {
        component.onConfirm();
    })
});
