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
    console.log(MatChip)
    return this.http.post('api/v1/swap/update/'+any, match)

  }
  constructor(public http: HttpClient) { }
}