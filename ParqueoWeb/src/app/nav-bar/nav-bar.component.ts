import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

    public rol: string = null;

    constructor(private router: Router) { }

    ngOnInit(): void {
        let user = JSON.parse(sessionStorage.getItem('user'));
        if(user != null)
            this.rol = user.rol;
    }

    onLogout () {
        sessionStorage.clear();
        this.router.navigate(['/']);
    }
}
