export interface FormData {
  controlName: string;
  controlType: string;
  valueType?: string;
  inputType?:string,
  currentValue?: string;
  placeholder?: string;
  options?: Array<{
    optionName: string;
    value: string;
  }>;
  validators?: {
    required?: boolean;
    minlength?: number;
    maxlength?: number;
    pattern? : any;
    message? : string;
  };
}
