
import { FormData } from './../../shared/interface/form-data';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl,ValidatorFn } from '@angular/forms';
import { RegisterForm } from './../../shared/json/registerjson';
import { RegisterService } from 'src/app/shared/service/registerservice';
import { Router,ActivatedRoute ,Params} from '@angular/router';

// function passwordMatchValidator(password: string): ValidatorFn {
//   return (control: FormControl) => {
//       console.log(control)
//       if (!control || !control.parent) {
//           return null;
//       }
//       return control.parent.get(password).value === control.value ? null : { mismatch: true };
//   };
// }

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
 EmailValue : any;
 MobileValue : any;
 returndata:any;
  Emailexitst : boolean;
  Mobileexitst : boolean;
  Register : boolean;
  regdata = RegisterForm;
  @Input()formData: FormData[];
  form: FormGroup;
  submitted: boolean;

  constructor(private RegService: RegisterService,private router: Router) {}

  ngOnInit() {
    this.Emailexitst = false;
    this.Mobileexitst = false;
    this.Register = false;
   // this.showme = false;
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
  else
  {
         this.RegService.register(this.form.value).subscribe(
        data => {
       this.returndata = data;
       if(this.returndata.responsecode === 1){
        this.Register = true;
        this.router.navigate(['/login'])
       }else if(this.returndata.responsecode === 2){
        this.Emailexitst = true;
      }else if(this.returndata.responsecode === 3){
        this.Mobileexitst = true;
      }else if(this.returndata.responsecode === 4){
        this.Emailexitst = true;
        this.Mobileexitst = true;
      }
      });
  }
  }
}
