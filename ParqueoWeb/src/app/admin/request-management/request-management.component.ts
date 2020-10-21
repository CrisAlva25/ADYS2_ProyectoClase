import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/servicios/rest.service';

const REQUEST_PARQUEO = 'all-parking';
const REQUEST_ACCEPTED = 'update-authorized';

@Component({
    selector: 'app-request-management',
    templateUrl: './request-management.component.html',
    styleUrls: ['./request-management.component.css']
})
export class RequestManagementComponent implements OnInit {
    public currentLot: any = {
        id: '',
        idParking: '',
        name: '',
        email: '',
        phone: '',
        photo: '',
        rol: '',
        favorites: '',
        block: '',
        status: '',
        tariff: '',
        tariffType: '',
        location: '',
        numberAvailable: '',
        numberCapacity: '',
        services: '',
        photos: '',
        dpi: '',
        criminalRecords: '',
        acceptTerm: '',
        authorized: '',
        rating: '',
        reports: ''
    };

    public parkingLots = [this.currentLot];

    constructor(public router: Router,
        public rest: RestService) { }

    @ViewChild('openModal', { static: false }) openModal: ElementRef;

    ngOnInit() {
        this.getParqueos();
    }

    async getParqueos() {
        try {
            this.parkingLots = await this.rest.GetRequest(REQUEST_PARQUEO).toPromise();
        } catch (error) {
            console.log(error);
        }
    }

    seeDetails(i: number): void {
        this.currentLot = this.parkingLots[i];
        console.log(this.currentLot.photo);
        console.log(this.currentLot.dpi);
        console.log(this.currentLot.criminalRecords)
        this.openModal.nativeElement.click();
    }

    async authorize(i: number) {
        this.currentLot = this.parkingLots[i];
        //console.log(this.currentLot);

        try {
            await this.rest.PostRequest(REQUEST_ACCEPTED, { id: this.currentLot.idParking, authorized: true }).toPromise();
            this.parkingLots[i].authorized = true;
        } catch (error) {
            console.log(error);
        }
    }

}
