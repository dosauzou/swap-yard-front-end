import { Component, Input, OnInit } from '@angular/core';
import { throws } from 'assert';
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
  @Input() itemArray = new Array<Match>();
  @Input() username = new Match();

  swap : Swap
  status: boolean;
  itemList: any [];
  date: string;
  time: string;
  location: string;
  name = sessionStorage.getItem('id')



  //check if swap is already in the database

  getSwapStatus(){

    console.log(this.itemArray)
    for (let x in this.itemArray){
      if(this.itemArray[x].user.username == this.username.user.username){
        this.swap = this.itemArray[x].swap;


        if(!this.swap){
          this.status = false

        }else
        this.status=true
  
      }
      

    }
    console.log('this is the status:'+ this.swap)
    return this.status

  }

  constructor() { }

  ngOnInit(): void {
   this.getSwapStatus
  }

}
