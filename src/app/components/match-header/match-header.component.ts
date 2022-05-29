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
  swapFalse: Array <any>= new Array<any>();
  swapUnscheduled: Array <any>= new Array<any>();
  swapTrue:Array <any>= new Array<any>();
  // username: any;



  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: {itemArray: Array<Match>, allMatches: Array<Match>, username: Match, matchItems: Array<any>}) {
    this.username1=dialogData.username;
 

   }

 method(){



  for(var i in this.dialogData.itemArray){
 
if(this.dialogData.itemArray[i].swap){
    switch(this.dialogData.itemArray[i].swap.swapStatus) {
      case "true" :
      this.swapTrue.push(this.dialogData.itemArray[i])
    break;
    case "false" :
    this.swapFalse.push(this.dialogData.itemArray[i])
    break;
    case null :
      this.swapUnscheduled.push(this.dialogData.itemArray[i])
    break;
      default:
        // this.status= false;
      }
    }else{
      this.swapUnscheduled.push(this.dialogData.itemArray[i])

    }
     
  }
 }

  ngOnInit(): void {
   this.method();
   console.log(this.swapUnscheduled, 'this is it')
   console.log(this.swapFalse)
   console.log(this.swapTrue)


  }

}
