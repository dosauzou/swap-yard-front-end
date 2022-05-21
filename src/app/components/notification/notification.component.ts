import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Match } from 'src/app/classes/match';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ItemComponent } from '../item/item.component';
import { MatchHeaderComponent } from '../match-header/match-header.component';
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
  array : Array<Match>
  username: any;
  itemList: any;
  panelOpenState = true;



  constructor(private notifications: NotificationsService, public dialog: MatDialog) { }


  save(username):void{
    const dialogRef = this.dialog.open(
    MatchHeaderComponent,{
      panelClass: 'my-outlined-dialog',
      width: '500px',
      height: '600px',
      data:{itemArray: this.array, username: username}

    }
    )};

  loadMatches(){
    this.match = new Match;
    this.array = new Array();
    this.notifications.doNotification(this.id).subscribe(
      data=>{

  for (let b in data){
    console.log(data[b])
  
          this.match = new Match
          this.match.user = data[b].user
          this.match.swap = data[b].swap
          this.match.itemList = data[b].items
          this.match.chatId = data[b].chatId
          this.array.push(this.match)
        
      }})
      return this.array
  }
  ngOnInit(): void {
    this.loadMatches()
   
  }
  //pass this match to the swap scheduler and say each match is going to have a swapid

}
