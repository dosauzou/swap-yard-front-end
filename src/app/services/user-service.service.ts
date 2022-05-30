import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../classes/user';
import { any, AnyAttrs } from '@tensorflow/tfjs-core';
import { AnonymousSubject } from 'rxjs/internal/Subject';

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

  createProfiler(details: FormData, l:any): Observable <object>{
    return this.http.post('api/v1/profiler/'+l, details);
  }
  
  getUser(any): Observable <object>{
    return this.http.get('api/v1/'+any);
  }

  editProfile(details: any, l:any): Observable<object>{
    return this.http.post('api/v1/details/'+l, details);
  }
  userSettings(details: any, l:any): Observable<object>{
    return this.http.post('api/v1/settings/'+l, details);
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
