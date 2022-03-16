import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppService } from './services/app-service.service';
import { finalize } from "rxjs/operators";
import { SwPush } from '@angular/service-worker';
import { NotificationsService } from './services/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Swapyard';
  auth: Boolean;
  id= sessionStorage.getItem('id');



  constructor(private app: AppService, private http: HttpClient, private router: Router, private _swPush: SwPush) {
    //checks to see if user is logged in 

    this.app.authenticate(undefined, undefined);

  }


    getAuth(){
      return this.app.authenticated
    }
  logout() {
    this.http.post('logout', {}).pipe(
      finalize(() => {
        this.app.authenticated = false;
        this.router.navigateByUrl('/login');
    })).subscribe();
  }
  public slides = [
    { src: "https://image1.com" },
    { src: "https://image2.com" },
    { src: "https://image3.com" },
    { src: "https://image4.com" }
  ];
}


