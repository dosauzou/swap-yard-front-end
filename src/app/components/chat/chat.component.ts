import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatService } from 'src/app/services/messaging.service';
import { UnmatchComponent } from '../unmatch/unmatch.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  newMessage: string;
  messageList: string[] = [];
  hour: any;
  minute:any;
  realTime: any;


  constructor(public dialog: MatDialog,private chatService: ChatService){

  }

  settings(){
    const dialogRef = this.dialog.open(
      UnmatchComponent,{
        width: '300px',
        height: '400px',
      });
  }

  getTime(){
    let dateTime = new Date()
    this.hour = dateTime.getHours();
    this.minute=dateTime.getMinutes();
    return this.hour+':'+this.minute;
  }

  ngOnInit(){
    this.chatService.getNewMessage().subscribe((message: string) => {
      if(message!=''){
      this.messageList.push(message);
      }
    })
}

  sendMessage() {
    if(this.newMessage || typeof this.newMessage!='undefined' ){
      this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
    }
  }
}