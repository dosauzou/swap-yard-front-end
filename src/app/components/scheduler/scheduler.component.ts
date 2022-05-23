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
  @Input() username = '';

  swap : Swap
  status: boolean;
  itemList: any [];
  date: string;
  time: string;
  location: string;



  //check if swap is already in the database

  getSwapStatus(){

    console.log(this.itemArray)
    for (let x in this.itemArray){
      if(this.itemArray[x].user.username == this.username){

        this.swap = this.itemArray[x].swap;
        console.log(this.itemArray[x])
      
        //if this .swap status = null
        console.log(this.swap + 'hey')

        if(!this.swap){
          this.status = false

        }else
        this.status=true
        //because swap status is false we display the thing

        // this.swap.status = true;
        // this.swap.details.date ='';
        // this.swap.details.location = '';
        // this.swap.details.time = '';

        //persist swap to the database

      }
      

    }
    console.log('this is the status:'+ this.swap)
    return this.status

  }
  //if the swap hasnt been scheduled

  // startDate: string;
  // endDate: string;
  // atendeeOne: string;
  // atendeeTwo: string;
  // location: string;
  // // event: any;

  // getAtendeeOne(){
  //  return this.atendeeOne 
  // }
  // getAtendeeTwo(){
  //  return this.atendeeTwo 
  // }

  // getLocation(){
  //   return this.location
  // }

  // event = {
  //   'summary': 'Swapyard 2022',
  //   'location': this.getLocation,
  //   'description': 'Swap preffered items',
  //   'start': {
  //     // 'dateTime': this.startDate,
  //     'timeZone': 'Ireland/Dublin'
  //   },
  //   'end': {
  //     // 'dateTime': this.endDate,
  //     'timeZone': 'Ireland/Dublin'
  //   },
  //   'recurrence': [
  //     'RRULE:FREQ=DAILY;COUNT=2'
  //   ],
  //   'attendees': [
  //     {'email': this.getAtendeeOne},
  //     {'email': this.getAtendeeTwo}
  //   ],
  //   'reminders': {
  //     'useDefault': false,
  //     'overrides': [
  //       {'method': 'email', 'minutes': 24 * 60},
  //       {'method': 'popup', 'minutes': 10}
  //     ]
  //   }
  // };

  constructor() { }

  ngOnInit(): void {
   this.getSwapStatus
  }

}
