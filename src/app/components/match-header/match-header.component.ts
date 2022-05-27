import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Match } from 'src/app/classes/match';
import { DialogData } from '../item/item.component';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-match-header',
  templateUrl: './match-header.component.html',
  styleUrls: ['./match-header.component.scss']
})
export class MatchHeaderComponent implements OnInit {
  username1: Match;
  // username: any;



  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: {itemArray: Array<Match>, allMatches: Array<Match>, username: Match}) {
    this.username1=dialogData.username;
  

   }

  ngOnInit(): void {
  }

}
