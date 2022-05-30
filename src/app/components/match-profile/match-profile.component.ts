import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { SwPush } from '@angular/service-worker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { data } from 'jquery';
import { ContentInterface } from 'src/app/classes/content';
import { Item } from 'src/app/classes/item';
import { User } from 'src/app/classes/user';
import { AppService } from 'src/app/services/app-service.service';
import { ItemService } from 'src/app/services/item-service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UploadService } from 'src/app/services/upload-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { DialogData, ItemComponent } from '../item/item.component';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-match-profile',
  templateUrl: './match-profile.component.html',
  styleUrls: ['./match-profile.component.scss']
})

export class MatchProfileComponent implements OnInit {
  itemtozoom: any;
  itemArray: any[];
  @Input() user : any;
  totalSwaps =0;


  // readonly VAPID_PUBLIC_KEY = 'BB_WkKNOcmJQSAub5Q_A_Cg3e4_qSSgkwZ6IouAitsX59ulO6DdE3s8Ihaz2lk9WCoPuwnDMYkOEF1HVpW0yZuM';

  constructor(public sanitizer: DomSanitizer, public dialog: MatDialog, private userService: UserServiceService, private app: AppService, private http: HttpClient, private itemS: ItemService, private upload: UploadService, public domSanitizationService: DomSanitizer, private swPush: SwPush,
    private notifications: NotificationsService, private modalService: NgbModal, private items: ItemService) {
     

    http.get('api/v1/token').subscribe(data => {
      const token = data['token'];
    }, () => { });
  }

  //overlay item if swapped
  //swaps to date 




 
  ngOnInit(): void {
    console.log(this.user)
    this.totalSwaps=this.user.matches.filter(p=>p.swap !==null && p.swap.swapStatus==='true').length

  }

}
