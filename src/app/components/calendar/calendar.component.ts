import { Component, OnInit } from '@angular/core';
import { executionAsyncResource } from 'async_hooks';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  selected: Date | null;
  showFiller = false;
  opened: boolean;
  clicker = false
  events: string[] = [];
  process: string;
  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
  time = 'time'
  confirm = 'confirm'
  meetingTime = { hour: 13, minute: 30 };
  location = 'location'
  CLIENT_ID = '343081254203-2a7m2g4crfbfji5uo4jo6hll8d6m42hb.apps.googleusercontent.com';
  API_KEY = 'AIzaSyBKHxE_AHRt9mOsUt1vaUE0lyBqeuk56ts';
  API_VERSION = 'v3';
  event: any;


  // Array of API discovery doc URLs for APIs used by the quickstart
  DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/people/v1/rest"];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  SCOPES = "https://www.googleapis.com/auth/calendar";

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


  initClient() {
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
          "resource": this.getEvent()
      
        })
          .then(function (response) {
            // Handle the results here (response.result has the parsed body).
            console.log("Response", response);
          },
            function (err) { console.error("Execute error", err); });
      },
        function (err) { console.error("Error loading GAPI client for API", err); });

  }
  
  getEvent(){
  return this.event = {
    'summary': 'Swapyard I/O 2022',
    'location': this.getLocation + '',
    'description': 'You\'ve scheduled a swap!',
    'start': {
      'dateTime': this.getDate + '' + this.getTime,
      'timeZone': 'Ireland/Dublin'
    },
    'end': {
      'dateTime': this.getDate + '' + this.getTime,
      'timeZone': 'Ireland/Dublin'
    },
    'recurrence': [
      'RRULE:FREQ=DAILY;COUNT=2'
    ],
    'attendees': [
      { 'email': 'dizooxo@gmail.com' },
      { 'email': 'isioje12@gmail.com' }
    ],
    'reminders': {
      'useDefault': false,
      'overrides': [
        { 'method': 'email', 'minutes': 24 * 60 },
        { 'method': 'popup', 'minutes': 10 }
      ]
    }

  };}


  getTime() {
    return this.meetingTime
  }

  getLocation() {
    return 'location'
  }

  getDate() {
    return this.selected
  }

  setProcess(any) {
    this.process = any
    console.log(this.process)
  }

  getProcess() {
    return this.process
  }

  constructor() { }


  sendToCalendar() {

  }

  ngOnInit(): void {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ client_id: "343081254203-pspbr0oed01hee8c3i8p66cfa12n6s9j.apps.googleusercontent.com" });
      this.authenticate().then(this.initClient)
    });

  }

}

// Property 'auth2' does not exist on type 'typeof gapi'. Did you mean 'auth'?
