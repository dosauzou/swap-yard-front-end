import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { Match } from '../classes/match';

@Injectable({
  providedIn: 'root'
})
export class SwapService {
  


  postSwap(match: any, any): Observable <any>{
    return this.http.post('api/v1/swap/update/'+any, match)

  }
  unmatch(match: any, any): Observable <any>{
    return this.http.post('api/v1/swap/update/unmatch/'+sessionStorage.getItem('id')+'/'+any, match)

  }
  markDone(match: number): Observable <any>{
    return this.http.post('api/v1/swap/update/markDone', match)

  }

  postDetails(any, list): Observable <any>{
    return this.http.post('api/v1/swap/update/list/'+any, list)

  }
  constructor(public http: HttpClient) { }
}
