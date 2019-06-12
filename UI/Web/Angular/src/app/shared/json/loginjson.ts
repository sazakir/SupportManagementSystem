import { FormData } from './../interface/form-data';
export const LoginForm: FormData[] = [
  
  {
    controlName: 'UserName',
    controlType: 'text',
    valueType: 'text',
    placeholder: 'Enter username',
    validators: {
      required: true,
      minlength: 6,
      pattern: /^[a-zA-Z]+$/,
      message: ' Only Alphabet is allowed'
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
