
import { FormData } from './../../shared/interface/form-data';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
//import { AppComponent } from 'src/app/app.component';
import { RegisterForm } from './../../shared/json/registerjson';
@Component({
  selector: 'app-registerform',
  template: `
  <div class="center-div">
  <app-registerform [formData]="regdata"></app-registerform>
   </div>
  `,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //regdata = AppComponent
  regdata = RegisterForm;
  @Input()formData: FormData[];
  form: FormGroup;
  submitted: boolean;

  constructor() {}

  ngOnInit() {
    const formGroup = {};
this.formData=this.regdata;
    this.formData.forEach(formControl => {
        console.log(formControl);
      formGroup[formControl.controlName] = new FormControl('');
    });

    this.form = new FormGroup(formGroup);
  }

  submitForm() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
  }
   
  }
}
