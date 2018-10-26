import {UserService} from './shared/services/user/user.service';
import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public loadingPage: boolean;

    constructor(public user: UserService) {
        // Rien ici
    }

    ngOnInit() {
        this.loadingPage = true;

        this.user.isLogged().then((res) => {
            this.loadingPage = false;
        });
    }
}
