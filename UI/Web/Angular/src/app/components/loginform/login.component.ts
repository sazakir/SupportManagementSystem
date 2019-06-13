import { LoginForm } from '../../shared/json/loginjson';
import { FormData } from './../../shared/interface/form-data';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router,ActivatedRoute ,Params} from '@angular/router';
import { LoginService } from 'src/app/shared/service/loginservice';
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
  returndata:any;
  login:boolean;
  @Input()formData: FormData[];
  form: FormGroup;
  submitted: boolean;

  constructor(private router: Router,private LogService: LoginService) {}

  ngOnInit() {
    this.login = false;
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
  else{
    this.LogService.login(this.form.value).subscribe(
      data => {
        console.log(data);
        this.returndata = data;
        if(this.returndata.responsecode === 0){
         this.login = true;
        }
        else{
          this.router.navigate(['/register'])
         }
       });
   }
  }
  onRegister()
  {
    //console.log('login');
    this.router.navigate(['/register'])
  }
}
