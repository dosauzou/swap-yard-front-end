import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Match } from 'src/app/classes/match';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ItemComponent } from '../item/item.component';
import { MatchComponent } from '../match/match.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  id= sessionStorage.getItem('id');
  match: Match;
  x: any
  array : any
  username: any;
  itemList: any;


  constructor(private notifications: NotificationsService, public dialog: MatDialog) { }


  save():void{
    const dialogRef = this.dialog.open(
    MatchComponent,{
      width: '500px',
      height: '600px',

    })};

  loadMatches(){
    this.match = new Match;
    this.array = new Array();
    this.notifications.doNotification(this.id).subscribe(
      data=>{

  for (let b in data){
    console.log(data[b].user)
          this.itemList = new Array();
          this.itemList.push(data[b].items)
          this.match = new Match
          this.match.user = data[b].user
          console.log(this.itemList)
          this.array.push(this.match)
        
      }})

  }
  ngOnInit(): void {
    this.loadMatches()
   
  }

}
