import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app-service.service';
import { User } from 'src/app/classes/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    email:['', Validators.required],
    username:['', Validators.required],
    phoneNo:['', Validators.required],
    password:['', Validators.required],
    confPassword:['', Validators.required]
  });
  submitted: boolean;

  constructor(private userService: AppService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.submitted = false;
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
    data => console.log(data), error => console.log(error))
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
