import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) { }

  addPushSubscriber(sub:any) {
    return this.http.post('server/api/v1/notifications', sub);
}

send() {
    return this.http.post('server/api/v1/newsletter', null);
}


}
