import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../classes/user';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {


  constructor(private http:HttpClient) { }
  getFile(imageName: any) {
    return this.http.get('server/api/v1/post/download/' + imageName)  }

  createUser(user: object): Observable <object>{
    return this.http.post('server/api/v1/users/save-user', user);
  }

  getUsers(){
    return this.http.get('/server/api/v1/users/users-list')

  }
  getPosts(){
    return this.http.get('server/api/v1/post/downloads')

  }
  loginUser(user: User): Observable <any>{
    return this.http.post('/server/api/v1/users/login', user)

  }
  uploadFile(formData: FormData): Observable <any>{
    return this.http.post('/server/api/v1/post/upload', formData)

  }

}
