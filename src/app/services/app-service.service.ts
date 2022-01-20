import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AppService {

  authenticated = true;

  constructor(private http: HttpClient) {
  }

  authenticate(credentials, callback) {
      //my users resource is unreachable 
        const headers = new HttpHeaders(
            {Authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password) })

        //403 error wont make request
        this.http.get('server/login',{headers: headers}).subscribe(response => {
            console.log(credentials)
            console.log(response)
            console.log(headers)
            if (response) {
                this.authenticated = true;
            } else {
                this.authenticated = false;
            }
            return callback && callback();
        });

    }

}