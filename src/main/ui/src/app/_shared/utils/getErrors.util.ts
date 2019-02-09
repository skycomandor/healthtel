import { FormGroup, FormArray } from '@angular/forms';

export function getErrors(field: string, form: FormGroup, fbArray?: string) {
  let type;
  if (fbArray) {
    const arr: FormArray = form.get(fbArray) as FormArray;
    type = arr.controls[field].errors;
  } else {
    type = form.controls[field].errors;
  }
  if (type) {
    if (type.required) {
      return 'This field is required';
    }
    if (type.minlength) {
      return `Minimum length ${type.minlength.requiredLength} characters`;
    }
    if (type.invalidEmail) {
      return 'E-Mail is invalid';
    }
    if (type.emailAlreadyTaken) {
      return 'User with this email already exist';
    }
    if (type.emailNotRegTaken) {
      return 'User with this email not registred';
    }
    if (type.nameAlreadyTaken) {
      return 'This name is not available';
    }
  }
  return '';
}
