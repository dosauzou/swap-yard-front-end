import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Match } from 'src/app/classes/match';
import { Swap } from 'src/app/classes/swap';
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
  scheduled: any;
  itemArray: any;
  chatId: any;
  allMatches: any;
  complete : Array<Match>;
  matchItems: any;

  //this ccannot be undone, you have to swap at least one item with the user
  //overlay on the swapped ited
  //item should have a swap satus
  //once the items aree swapped overlay, on the thing, 
  //then the items are removed from the items list or something,
  // that will be notifcatioin pane done, if i can just get the swap status thing majig
  //to marks as done it bhas to go through image analyser
  //last thing will be the mark as done (Which will include image analyses of the items)
  //user successful swaps will be stated above
  //should go through image analyser on upload and when marking as done


  constructor(private notifications: NotificationsService, public dialog: MatDialog, public sanitizer: DomSanitizer) { }


  save(username : Match):void{
    console.log(username.user)
    const dialogRef = this.dialog.open(
    MatchHeaderComponent,{
      panelClass: 'my-outlined-dialog',
      width: '500px',
      height: '600px',
      data:{itemArray: this.itemArray, allMatches: this.allMatches,  username: username, matchItems: this.matchItems}

    }
    )};

  loadMatches(){

    this.match = new Match;
    this.array = new Array();
    this.itemArray = new Array()
    this.scheduled = new Array();
    this.allMatches = new Array();
    this.complete =  new Array();
    this.notifications.doNotification(this.id).subscribe(
      data=>{
        console.log(data)

  for (let b in data){
          this.match =  data[b]
          this.matchItems = data[b].matchItems

        if(this.match.user.profilepic)
          this.match.user.profilepic = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+ this.match.user.profilepic.data)

          this.itemArray.push(this.match)
          this.allMatches.push(this.match)
      if(this.match.swap){
          switch(this.match.swap.swapStatus) {
            case "true":
              this.complete.push(this.match)
              console.log("Passed");

              break;
            case "false":
              this.scheduled.push(this.match)
              console.log("Passed");

              break;
              case null:
                this.array.push(this.match)
                console.log("Passed");
  
                break;
        
            default:

            }
          }else
          this.array.push(this.match)

         
          
        
      }})
      return this.array
  }
  ngOnInit(): void {
    this.loadMatches()

   
  }
  //pass this match to the swap scheduler and say each match is going to have a swapid

}
