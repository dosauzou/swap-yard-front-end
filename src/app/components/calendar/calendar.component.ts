import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { executionAsyncResource } from 'async_hooks';
import { Match } from 'src/app/classes/match';
import { Swap } from 'src/app/classes/swap';
import { SwapDetails } from 'src/app/classes/swap-details';
import { SwapService } from 'src/app/services/swap.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})


export class CalendarComponent implements OnInit {

  @Input() itemArray = new Array<Match>();
  @Input() username = '';

  locationForm = this.fb.group({
    inputAddress: ['', Validators.required],
    inputCity: ['', Validators.required],
    inputCounty: ['', Validators.required],
    inputZip: ['', Validators.required]
  })
  selected: Date;
  showFiller = false;
  opened: boolean;
  clicker = false
  events: string[] = [];
  process: string;
  time = 'time'
  confirm = 'confirm'
  meetingTime = { hour: 13, minute: 30 };
  location = 'location'
  event: any;
  argArray: Array<any>
  userEmail: String;
  swap: Swap
  userMatch: Match
  matchArray: Array<Match>
  userd: Promise<Match | void>;
  user: Promise<void | Match>;


  execute() {
    return gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': this.event
    })
      .then(function (response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", response);
      },
        function (err) { console.error("Execute error", err); });
  }

  authenticate() {

    return gapi.auth2.getAuthInstance()
      .signIn({ scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events" })
      .then(function () { console.log("Sign-in successful"); },
        function (err) { console.error("Error signing in", err); });
  }

  // add in user emils
  initClient(any) {
    console.log(any)
    console.log(any[0])
    console.log(any[1])
    console.log(any[2])


    gapi.client.setApiKey("AIzaSyBKHxE_AHRt9mOsUt1vaUE0lyBqeuk56ts");
    return gapi.client.load("calendar", "v3")
      .then(() => {
        console.log("GAPI client loaded for API");
        return gapi.client.calendar.events.insert({
          "calendarId": "primary",
          "conferenceDataVersion": 1,
          "maxAttendees": 3,
          "sendNotifications": true,
          "sendUpdates": "all",
          "resource":
          {
            'location': any[2],
            'summary': 'Swapyard I/O 2022',
            'description': 'You\'ve scheduled a swap!',
            "end": {
              "dateTime": any[0],
              "timeZone": "Europe/Dublin"
            },
            "start": {
              "dateTime": any[0],
              "timeZone": "Europe/Dublin"
            },
            'attendees': [
              { 'email': any[1] }
            ],
            'reminders': {
              'useDefault': false,
              'overrides': [
                { 'method': 'email', 'minutes': 24 * 60 },
                { 'method': 'popup', 'minutes': 10 }
              ]
            }
          }
        })
          .then((response) => {
            console.log(response)
            let j = new Date(any[0])
            var d = j.toDateString()
            var t = j.toTimeString()
            this.swap = new Swap
            // this.swap.swapStatus = false
            this.swap.details = new SwapDetails
            this.swap.details.date = d
            this.swap.details.location = any[2]
            this.swap.details.time = t
            this.matchArray = new Array
            this.matchArray = any[3].slice()

            //persist swap to database
            for (let x in this.matchArray) {
              console.log(this.matchArray)
              if (this.matchArray[x].user.username == any[4]) {
                this.matchArray[x].swap = this.swap
                this.userMatch = this.matchArray[x]
                this.userMatch.user=this.userMatch.user.username
                this.userMatch.itemId = this.userMatch.items.map(e=>e.id);
                this.userMatch.items = null;
                // this.setMatch(this.matchArray[x])


                //persist this match back to the database along with the id of the current logged in user
                //then find match by id of logged in user that has a corresponding match of the user persistsed
                //set the swap status and details of that match
                //next time we recieve info from the database
                //it will be letting us know whether the progress of the match is true or false
                //if its true which it will be, the match should be move to a different section of the page
                //also if its true, the confirmaation details of the swap will be shown
                //in place of the swap scheduler


              }

            }


            // Handle the results here (response.result has the parsed body).
            return this.userMatch

          },
            function (err) { console.error("Execute error", err); });

      },
        function (err) { console.error("Error loading GAPI client for API", err); });

  }

  getTime() {
    return this.meetingTime.hour + ':' + this.meetingTime.minute
  }
  setMatch(any) {
    this.userMatch = any
  }
  getMatch() {
    return this.userMatch
  }
  getLocation() {
    return this.locationForm.get('inputAddress')?.value + ', '
      + this.locationForm.get('inputCity')?.value + ', '
      + this.locationForm.get('inputCounty')?.value + ', '
      + this.locationForm.get('inputZip')?.value
  }

  getDate() {
    return this.selected
  }
  getStringDate() {
    return this.selected.toDateString()
  }
  setProcess(any) {
    this.process = any
  }

  getProcess() {
    return this.process
  }

  getDateTime() {
    this.getDate().setHours(this.meetingTime.hour)
    this.getDate().setMinutes(this.meetingTime.minute)
    return this.getDate().toISOString()
  }


  getUserEmails() {

    for (let x in this.itemArray) {
      if (this.itemArray[x].user.username == this.username) {

        this.userEmail = this.itemArray[x].user.email

      }

    }
    return this.userEmail
  }
  constructor(private fb: FormBuilder, private http: HttpClient, private swapService: SwapService) { }


  sendToCalendar(any) {
    this.userMatch = new Match()

    this.process = any
    //pass in user emails
    //pass in the location
    this.argArray = new Array
    this.argArray.push(this.getDateTime())
    this.argArray.push(this.getUserEmails())
    this.argArray.push(this.getLocation())
    this.argArray.push(this.itemArray)
    this.argArray.push(this.username)
    user: Match


    gapi.load("client:auth2", () => {
      gapi.auth2.init({ client_id: "343081254203-pspbr0oed01hee8c3i8p66cfa12n6s9j.apps.googleusercontent.com" })
      // this.swapService.postSwap(this.authenticate().then(this.initClient.bind(this.getDate(), this.argArray)), sessionStorage.getItem('id')).subscribe(data=>{
      //   console.log(data)
      // })
      this.authenticate().then(this.initClient.bind(this.getDate(), this.argArray)).then(data => {
        console.log(data)
        this.swapService.postSwap(data, sessionStorage.getItem('id')).subscribe(data => {
          console.log(data)
        })
      })

    })
  }

  ngOnInit(): void {
  }

}

