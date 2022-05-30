import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomValidators } from 'src/app/classes/custom-validators';
import { UserServiceService } from 'src/app/services/user-service.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

 passForm = this.fb.group({
  password: new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ])});
 editForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],

  });

  submitted: boolean;
  submitted1: boolean;

onPasswordChange(){
  this.submitted1 = true;
  if(this.passForm.invalid){
    return
  }else{
    var x = {password: this.passForm.value['password']}
    this.us.userSettings(x,sessionStorage.getItem('id')).subscribe(data=>
      console.log(data))
      this.snackbar.open('Password changed successfully',null, {
        duration: 3000
      });

  }


}
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.editForm.invalid) {
        return;
    }else{
      var x = {email: this.editForm.value['email']}
      this.us.userSettings(x,sessionStorage.getItem('id')).subscribe()
        this.snackbar.open('Email changed successfully',null, {
          duration: 3000
        });
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.editForm.value, null, 4));
}

get f() { return this.editForm.controls; }
get b() { return this.passForm.controls; }


  constructor( private fb: FormBuilder, private us: UserServiceService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  
  }

}




