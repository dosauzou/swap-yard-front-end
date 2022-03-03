import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SwipesService {
  createSwipe(id: any, userId: any){
   
    return this.http.get('api/v1/'+userId+'/swiped/' + id)
  }
  constructor(private http:HttpClient) { }
}
