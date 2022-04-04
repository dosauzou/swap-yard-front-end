import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AppService {

  authenticated = false;

  constructor(private http: HttpClient) {
  }

  authenticate(credentials, callback) {
      //my users resource is unreachable 
      const headers = new HttpHeaders(credentials ? {
        authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});
        // const headers = new HttpHeaders(
        //     {credentials ? { Authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password) } : {});

        //403 error wont make request
        this.http.get('api/v1/login',{headers: headers}).subscribe(response => {
         
            if (response) {
                console.log(response)
                sessionStorage.setItem('id', credentials.username);
                this.authenticated = true;
            } else {
                this.authenticated = false;
            }
            return callback && callback();
        });

    }

    isAuthenticated() { return this.authenticated; }

    // isAuthenticated(): boolean {
    //     const token = sessionStorage.getItem('token');
    //     // Check whether the token is expired and return
    //     // true or false
    //     return !this.jwtHelper.isTokenExpired(token);
    //   }
    

    createUser(user: object): Observable <object>{
        return this.http.post('api/v1/register', user);
      }
    
    
    getUsers(){
        return this.http.get('api/v1/users-list')
    
      }

}