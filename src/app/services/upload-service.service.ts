import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  
  createPost(post: object): Observable <object>{
    return this.http.post('server/api/v1/post/uploadRaw', post);
  }

  getPosts(){
    return this.http.get('server/api/v1/post/downloads')

  }

  uploadFile(formData: FormData): Observable <any>{
    return this.http.post('/server/api/v1/post/upload', formData)

  }
  getFile(imageName: any) {
    return this.http.get('server/api/v1/post/download/' + imageName)  
  }

  constructor(private http:HttpClient) { }
}
