import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { data } from 'jquery';
import { DialogData } from '../item/item.component';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-match-profile',
  templateUrl: './match-profile.component.html',
  styleUrls: ['./match-profile.component.scss']
})
export class MatchProfileComponent implements OnInit {

username:any;

  constructor(){}
   

  ngOnInit(): void {
  }

}
