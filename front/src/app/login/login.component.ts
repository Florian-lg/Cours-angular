import {UserService} from './../shared/services/user/user.service';
import {Component, OnInit, Output, EventEmitter, isDevMode} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public log: string;
    public pass: string;
    public loading: boolean;
    public userFormGroup: FormGroup;
    
    constructor(private user: UserService, private fb: FormBuilder) {
    }

    ngOnInit() {
        this.loading = false;
        this.userFormGroup = this.fb.group({
            log: ['admin', [Validators.required, Validators.minLength(3)]],
            pass: [null, Validators.required]
        });
    }

    onSubmit() {
        this.loading = true;

        const data = {login: this.log, password: this.pass};

        this.user.login(data).then((res) => {
            this.loading = false;
        });
    }
}
