import { FormGroup } from "@angular/forms";

export class CustomValidators {
    static mustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
          const control = formGroup.controls[controlName];
          const matchingControl = formGroup.controls[matchingControlName];
    
          if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
          }
          if (!matchingControl.value) {
            return null;
          }
          // set error on matchingControl if validation fails
          if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
          } else {
            matchingControl.setErrors(null);
          }
          return null;
        };
      }
    
}
