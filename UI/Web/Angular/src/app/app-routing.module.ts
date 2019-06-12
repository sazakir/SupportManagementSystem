import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/loginform/login.component';
import { RegisterComponent } from './components/registerform/register.component';
import { AppComponent } from './app.component';
export const AppComponents: any = [
   AppComponent,
 LoginComponent,
 RegisterComponent
];
const routes: Routes = [
   { path: '', component: AppComponents },
   // { path: '', component: LoginComponent },
   { path: 'register', component: RegisterComponent },
   { path: "login", component: LoginComponent}
   // { path: '**', redirectTo: '' }//,
];
@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }