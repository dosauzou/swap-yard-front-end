import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DislikesService {

  sendDislike(id: any, userid): Observable <object>{
    return this.http.post('api/v1/dislike/'+userid, id);
  }

  getDislikeLikes(userid): Observable <object>{
    return this.http.get('api/v1/dislike/'+userid);
  }



  constructor(private http: HttpClient) { }
}
