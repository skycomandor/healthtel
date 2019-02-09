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
      return 'Заполните поле';
    }
    if (type.minlength) {
      return `Минимальное количество символов ${type.minlength.requiredLength}`;
    }
    if (type.invalidEmail) {
      return 'Введите правильный E-Mail';
    }
    if (type.emailAlreadyTaken) {
      return 'Пользователь с таким E-Mail уже существует';
    }
    if (type.emailNotRegTaken) {
      return 'Пользователь с таким E-Mail не существует';
    }
  }
  return '';
}
