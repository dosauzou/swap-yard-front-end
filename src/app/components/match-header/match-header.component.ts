import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../item/item.component';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-match-header',
  templateUrl: './match-header.component.html',
  styleUrls: ['./match-header.component.scss']
})
export class MatchHeaderComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

}
