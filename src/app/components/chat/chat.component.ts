import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Message } from 'src/app/classes/message';
import { ChatService } from 'src/app/services/messaging.service';
import { UnmatchComponent } from '../unmatch/unmatch.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  chat: Message
  newMessage: string
  @Input() username = '';


  messageList: Message[] = [];
  hour: any;
  minute:any;
  realTime = this.getTime();


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
        this.chat = new Message()
        this.chat.content = message;
        this.chat.time = this.getTime();
        this.messageList.push(this.chat);
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