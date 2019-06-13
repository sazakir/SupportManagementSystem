import { FormData } from './../interface/form-data';
export const LoginForm: FormData[] = [
  
  {
    controlName: 'Email',
    controlType: 'text',
    valueType: 'text',
    placeholder: 'Enter Email Address',
    validators: {
      required: true,
      pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
      message: 'Invalid email'
    }
  },
  {
    controlName: 'Password',
    placeholder: ' Enter Password',
    valueType: 'password',
    controlType: 'text',
    validators: {
      required: true,
      minlength: 7,
      maxlength: 10
    }
  },
];
