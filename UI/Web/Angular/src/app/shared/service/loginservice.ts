import {Component} from '@angular/core'
import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {
  user : string;
  readonly rootURL = "http://localhost:5000/api/register"
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200/'
    })
};
login(form : any ) {
  console.log(form);
  var Data =
  {
    Email: form.Email,
    Password:  form.Password
  };

  console.log(Data);
  return this.http.post(this.rootURL + `/login/`, Data, this.httpOptions);
}
}
