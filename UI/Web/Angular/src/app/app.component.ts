import { Component, ViewChild } from "@angular/core";
import { Validators } from "@angular/forms";
import { FieldConfig } from "./field.interface";
import { DynamicFormComponent } from "./components/dynamic-form/dynamic-form.component";
import { DynamicFieldDirective } from "./components/dynamic-field/dynamic-field.directive";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  // constructor(private qcs:DynamicFieldDirective) {}
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  regConfig: FieldConfig[] = [
    {
      key: 'FirstName',
      type: "input",
      label: "First Name",
      inputType: "text",
      name: "FirstName",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "First Name Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern("^[a-zA-Z]+$"),
          message: "Accept only text"
        },
        {
          name: "maxlength",
          validator: Validators.maxLength(50),
          message: "Maximum 50 chars allowed"
        }
      ]
    },
    {
      key: 'lastName',
      type: "input",
      label: "Last Name",
      inputType: "text",
      name: "LastName",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Last Name Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern("^[a-zA-Z]+$"),
          message: "Accept only text"
        },
        {
          name: "maxlength",
          validator: Validators.maxLength(50),
          message: "Maximum 50 chars allowed"
        }
      ]
    },
    {
      key: 'Email',
      type: "input",
      label: "Email Address",
      inputType: "email",
      name: "email",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Email Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern(
            "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
          ),
          message: "Invalid email"
        }
      ]
    },
    {
      key: 'Mobile',
      type: "input",
      label: "Phone Name",
      inputType: "text",
      name: "PhoneName",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Name Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern("^[0-9]+$"),
          message: "Accept only Number"
        },
        {
          name: "maxlength",
          validator: Validators.maxLength(10),
          message: "Maximum 10 chars allowed"
        }
      ]
    },
    {
      key: 'Password',
      type: "input",
      label: "Password",
      inputType: "password",
      name: "password",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Password Required"
        },
        {
          name: "minlength",
          validator: Validators.minLength(6),
          message: "Minimum 6 chars allowed"
        }
      ]
    },
    {
      type: "input",
      label: "Confirm Password",
      inputType: "password",
      name: "confirmpassword",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Confirm Password Required"
        },
        {
          name: "minlength",
          validator: Validators.minLength(6),
          message: "Minimum 6 chars allowed"
        }
      ]
    },
    {
      type: "button",
      label: "Save"
    }
  ];
  submit(value: any) {}
}
