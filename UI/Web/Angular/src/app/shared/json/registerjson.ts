import { FormData } from './../interface/form-data';

export const RegisterForm: FormData[] = [
  
    {
      controlName: 'FirstName',
      controlType: 'text',
      valueType: 'text',
      placeholder: 'Enter First Name',
      validators: {
        required: true,
        maxlength: 50,
        pattern: /^[a-zA-Z]+$/,
        message: 'Accept only Alphabet'
      }
    },
    {
      controlName: 'LastName',
      controlType: 'text',
      valueType: 'text',
      placeholder: 'Enter Last Name',
      validators: {
        required: true,
        maxlength: 50,
        pattern: /^[a-zA-Z]+$/,
        message: 'Accept only Alphabet'
      }
    },
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
    controlName: 'Mobile',
    controlType: 'text',
    valueType: 'text',
    placeholder: 'Enter Mobile Number',
    validators: {
      required: true,
      maxlength: 10,
      pattern: /^[0-9]+$/,
      message: 'Accept only Number'
    }
  },
    {
      controlName: 'Password',
      placeholder: ' Enter Password',
      valueType: 'password',
      controlType: 'text',
      validators: {
        required: true,
        minlength: 6
      }
    },
    {
      controlName: 'Confirm Password',
      placeholder: ' Enter Confirm Password',
      valueType: 'Confirmpassword',
      controlType: 'text',
      validators: {
        required: true,
        minlength: 6
      }
    }
  ];