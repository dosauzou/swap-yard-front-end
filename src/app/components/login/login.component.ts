import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = new User();

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })
  submitted: boolean;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;

  constructor(private fb: FormBuilder,private userService: UserServiceService, private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.submitted = false;
  }

  saveUser(){
    this.user = new User();
    this.user.email = this.email?.value;
    this.user.password = this.password?.value;
    this.save();
  }

  save(){
    this.userService.loginUser(this.user).subscribe(
      data=>{
        console.log("response recieved");
        this.router.navigate(["/home"])

     } ,
      error => { 
        console.log("exception occured");
    })
  }
  
    //   (    data: any) => console.log(data), (error: any) => console.log(error))
    // this.user = new User ();

    
  

  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }
  onSubmit(){
    this.saveUser();
    console.log(this.loginForm.value);
  }

  addUserForm(){
    this.submitted=false;
    this.loginForm.reset();
  }

  handleLogin() {
  //   this.authenticationService.authenticationService(this.username, this.password)
  //     this.loginSuccess = true;
  //     this.successMessage = 'Login Successful.';
  //     this.router.navigate(['/hello-world']);
  //   }, () => {
  //     this.invalidLogin = true;
  //     this.loginSuccess = false;
  //   });      
  // }


}
}