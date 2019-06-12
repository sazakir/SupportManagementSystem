import { LoginForm } from '../../shared/json/loginjson';
import { FormData } from './../../shared/interface/form-data';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router,ActivatedRoute ,Params} from '@angular/router';
@Component({
  selector: 'app-loginform',
  template: `
  <div class="center-div">
  <app-loginform [formData]="data"></app-loginform>
   </div>
  `,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  @Input()formData: FormData[];
  form: FormGroup;
  submitted: boolean;

  constructor(private router: Router) {}

  ngOnInit() {
    let data = LoginForm;
    const formGroup = {};
    this.formData=data;
    this.formData.forEach(formControl => {
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
  onRegister()
  {
    //console.log('login');
    this.router.navigate(['/register'])
  }
}
