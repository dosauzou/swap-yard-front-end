import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { throws } from 'assert';
import { truncateSync } from 'fs';
import { Item } from 'src/app/classes/item';
import { Match } from 'src/app/classes/match';
import { Swap } from 'src/app/classes/swap';
declare var gapi: any;

//set location, datetime, timezone, no recurrence, attendees emails will be the logged in


// var request = gapi.client.calendar.events.insert({
//   'calendarId': 'primary',
//   'resource': event
// });

// request.execute(function(event) {
//   // appendPre('Event created: ' + event.htmlLink);
// });

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {
  @Input() itemArray = new Array<any>();
  @Input() username = new Match();

  swap : any
  status: boolean = true;
  itemList: any [];
  date: string;
  time: string;
  location: string;
  name = sessionStorage.getItem('id')
  @Input() swapList = new Array<Item>();


  //check if swap is already in the database

  getSwapStatus(){

    console.log(this.itemArray)
    for (let x in this.itemArray){
      if(this.itemArray[x].user.username == this.username.user.username){
      if(this.itemArray[x].swap){

        this.swap = this.itemArray[x].swap
        console.log(this.swap.swapItems)

        for(var l in this.swap.swapItems){
          for(var j in this.swap.swapItems[l].images){

          console.log('these are the images')

          this.swap.swapItems[l].images[j].data = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+ this.swap.swapItems[l].images[j].data)
          }
        }
        switch(this.itemArray[x].swap.swapStatus) {
          case "true" || "false":
          this.status = true;
            break;
            case null:
              this.status =false
              break;
      
          default:
            // this.status= false;
          }
        }else this.status =false
  
      }
      

    }
    return this.status

  }

  constructor(public sanitizer: DomSanitizer,) { }

  ngOnInit(): void {
  }

}
