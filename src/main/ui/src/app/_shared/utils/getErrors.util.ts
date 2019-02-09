import { FormGroup } from '@angular/forms';

export function getErrors(field: string, form: FormGroup) {
  const type = form.controls[field].errors;
  if (/* form.controls[field].dirty && */ type) {
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
