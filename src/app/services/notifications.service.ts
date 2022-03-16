import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) { }

  addPushSubscriber(sub:any, id:any) {
    console.log(sub)
    return this.http.post('api/v1/notifications/'+id, sub);
}

doNotification(id:any){
  return this.http.get('api/v1/notifications/'+id);
}

send() {
    return this.http.post('api/v1/newsletter', null);
}


}
