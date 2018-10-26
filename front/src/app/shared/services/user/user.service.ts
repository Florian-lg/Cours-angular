import {StorageService} from './../storage/storage.service';
import {APIHelper} from './../api-helper/api-helper.service';
import {User, UserInfosInterface} from './../../class/user/user';
import {Injectable} from '@angular/core';

@Injectable()
export class UserService {
    private _user: User;

    constructor(private api: APIHelper, private storage: StorageService) {
        this._user = new User();
    }

    public login({login, password}: { login: string, password: string }): Promise<boolean> {
        const datas = {
            pseudo: login,
            password: password
        };

        const fakeResponse = {
            success: true,
            response: {
                user: {
                    pseudo: 'Pseudo',
                    birthdate: 125248421,
                    email: 'toto@test.fr',
                    firstname: 'toto',
                    gender: 'male',
                    lastname: 'TATA',
                    role: 'admin',
                    status: 'active',
                    logged: true
                }
            }
        };

        const fakeCall = new Promise((resolve, reject) => {
            resolve(fakeResponse.response);
        });

        // return this.api.requestApi({action: '/login', method: 'POST', datas: datas})
        return fakeCall.then((res: any) => {
            if (!res) {
                throw new Error('Error login');
            }

            if (this.initializeUser({userInfos: res.user})) {
                // Connexion réussie
                this.storage.set({key: 'token', value: res.token});
                return true;
            } else {
                // Connexion échouée
                return false;
            }
        });
    }

    public whoAmI({token}: { token: string }): Promise<boolean> {

        const fakeResponse = {
            success: true,
            response: {
                user: {
                    pseudo: 'Pseudo',
                    birthdate: 125248421,
                    email: 'toto@test.fr',
                    firstname: 'toto',
                    gender: 'male',
                    lastname: 'TATA',
                    role: 'admin',
                    status: 'active',
                    logged: true
                }
            }
        };

        const fakeCall = new Promise((resolve, reject) => {
            resolve(fakeResponse.response);
        });

        // return this.api.requestApi({action: '/whoAmI', method: 'GET'})
        return fakeCall.then((res: any) => {
            if (!res) {
                return false;
            }

            return this.initializeUser({userInfos: res.user});
        });
    }

    private initializeUser({userInfos}: { userInfos: UserInfosInterface }) {
        return this._user.login(userInfos);
    }

    public isLogged(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (this.user.logged) {
                resolve(true);
            }

            this.storage.get({key: 'token'}).then((res) => {
                if (!res) {
                    resolve(false);
                    return;
                }

                return this.whoAmI({token: res});
            }).then((res) => {
                resolve(res);
            });
        });
    }

    public disconnect(): Promise<boolean> {
        return this.storage.set({key: 'token', value: ''}).then((res) => {
            this._user = new User();

            return true;
        });
    }

    get user(): User {
        return this._user;
    }
}