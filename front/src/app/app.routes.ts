import {LoginComponent} from './login/login.component';
import { ListTicketsComponent } from './list-tickets/list-tickets.component';
export const APP_ROUTES = [
{
component: LoginComponent,
path: 'login'
},
{
component: ListTicketsComponent,
path: './list-tickets'
},
{
redirectTo: 'login',
path: '**'
},
];