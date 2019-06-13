import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/loginform/login.component';
import { RegisterService } from './shared/service/registerservice';
import { RegisterComponent } from './components/registerform/register.component';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';  
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './shared/service/loginservice';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  entryComponents: [
    LoginComponent,
    RegisterComponent
],
  imports: [
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [RegisterService,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
