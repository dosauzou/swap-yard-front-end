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
    console.log(data[b].user)
  
          this.match = new Match
          this.match.user = data[b].user
          this.match.itemList = data[b].items
          console.log(this.match.itemList.length)
          this.array.push(this.match)
          console.log(this.array)
        
      }})
      return this.array
  }
  ngOnInit(): void {
    this.loadMatches()
   
  }

}
