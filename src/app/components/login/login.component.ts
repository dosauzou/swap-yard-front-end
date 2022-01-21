import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import {AppService} from 'src/app/services/app-service.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  credentials = {username: '', password: ''};


  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
    
  })

  submitted: boolean;


  constructor(private app: AppService, private http: HttpClient, private router: Router, private fb: FormBuilder) {
  }

  ngOnInit(): void {

    this.submitted = false;
  }

    onSubmit() {
      this.credentials.password= this.getPassword;
      this.credentials.username = this.getUsername

      this.app.authenticate(this.credentials, () =>  {
          this.router.navigateByUrl('/profile');
      });
      return false;
  
    }

  get getPassword(){
    return this.loginForm.get('password')?.value;
  }
  get getUsername(){
    return this.loginForm.get('username')?.value;
  }
}

//Login works fine, now we need to get session details
//On Login the header should change