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



  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: {itemArray: Array<Match>, username: string}) { }

  ngOnInit(): void {
    console.log(this.dialogData.itemArray)
  }

}
