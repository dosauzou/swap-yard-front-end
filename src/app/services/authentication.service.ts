import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public username: String;
  public password: String;

  constructor(private http: HttpClient) { }

  authenticationService(username: String, password: String) {
    // return this.http.get(`http://localhost:8080/api/v1/basicauth`,
      // { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
        // this.username = username;
        // this.password = password;
        // this.registerSuccessfulLogin(username, password);
      // }));
  // }

  // createBasicAuthToken(username: String, password: String) {
    // return 'Basic ' + window.btoa(username + ":" + password)
  // }

  // registerSuccessfulLogin(username, password) {
  //   sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
  // }

 
// }
  }
}
