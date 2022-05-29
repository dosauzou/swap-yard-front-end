import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app-service.service';
import { User } from 'src/app/classes/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: User = new User();

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName:['', Validators.required],
    email:['', [Validators.required,Validators.email]],
    username:['', [Validators.required, Validators.minLength(6)]],
    phoneNo:['', [Validators.required, Validators.pattern("^((\\+353-?)|0|353)?[0-9]{9}$")]],
    password:['', [Validators.required, Validators.minLength(6)]],
  });
  submitted: boolean;

  constructor(private userService: AppService, private fb: FormBuilder, private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.submitted = false;
  }
  get f(){  
    return this.registerForm.controls;  
  } 

  saveUser(){
    this.user = new User();
    this.user.firstName= this.FirstName?.value;
    this.user.lastName = this.LastName?.value;
    this.user.username = this.userName?.value;
    this.user.email = this.email?.value;
    this.user.password = this.password?.value;
    this.user.phoneNo= this.phoneNo?.value;
    this.save();
  }

  save(){
    this.userService.createUser(this.user).subscribe(
    data => {console.log(data)
    this.router.navigateByUrl('/login');
    }, error => {console.log(error)
    let x = this.snackbar.open("An account with this username or email already exists")}
      )
    this.user = new User ();
  }

  get FirstName(){
    return this.registerForm.get('firstName');
  }
  get LastName(){
    return this.registerForm.get('lastName');
  }
  get email(){
    return this.registerForm.get('email');
  }
  get userName(){
    return this.registerForm.get('username');
  }
  get password(){
    return this.registerForm.get('password');
  }
  get phoneNo(){
    return this.registerForm.get('phoneNo');
  }

  onSubmit(){
    this.saveUser();
    console.log(this.registerForm.value);
  }

  addUserForm(){
    this.submitted=false;
    this.registerForm.reset();
  }

}
