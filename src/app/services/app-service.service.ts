import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
        this.http.get('server/api/v1/login',{headers: headers}).subscribe(response => {
         
            if (response) {
                sessionStorage.setItem('id', credentials.username);
                this.authenticated = true;
            } else {
                this.authenticated = false;
            }
            return callback && callback();
        });

    }

    createUser(user: object): Observable <object>{
        return this.http.post('server/api/v1/register', user);
      }
    
    
    getUsers(){
        return this.http.get('/server/api/v1/users-list')
    
      }

}