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



 
  createPost(post: object): Observable <object>{
    return this.http.post('api/v1/post/uploadRaw', post);
  }

 //by user so add in userid
  getPosts(id : any){
    return this.http.get('api/v1/post/downloads/'+id)

  }
 
  uploadFile(formData: FormData): Observable <any>{
    return this.http.post('api/v1/post/upload', formData)

  }
  getFile(imageName: any) {
    return this.http.get('api/v1/post/download/' + imageName)  
  }

}
