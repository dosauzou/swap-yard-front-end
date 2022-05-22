import { Component, Input, OnInit } from '@angular/core';
import axios from 'axios';
import { Match } from 'src/app/classes/match';
import { StreamChat, ChannelData, Message, User, Channel, UserFromToken } from 'stream-chat';
@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {
  @Input() match = '';
  @Input() itemArray = new Array<Match>();

  title = 'angular-chat';
  channel: Channel;
  username = sessionStorage.getItem('id');
  messages: Message[] = [];
  newMessage = '';
  channelList: ChannelData[];
  chatClient: any;
  b: any
  currentUser: User;
  chatId : any;
  time: Date;


  async joinChat() {
    this.chatId = this.sortArray()
    const { username } = this;
    const  chatId = this.chatId;
    console.log(chatId)

    try {
      const response = await axios.post('http://localhost:5500/join', {
        username,
        chatId
      });
      const { token } = response.data;
      const apiKey = response.data.api_key;

      this.chatClient = new StreamChat(apiKey)

      this.currentUser = await this.chatClient.connectUser({
        //set equal to username
        name: sessionStorage.getItem('id'),
        id: sessionStorage.getItem('id')
        },
        token
        );
        this.b = this.currentUser['me'] as User
          //channel should be the session id + users name
      //create specific channel per person
      const channel = this.chatClient.channel('messaging', this.chatId);
      await channel.watch();
      this.channel = channel;
      this.messages = channel.state.messages;
      this.channel.on('message.new', event => {    
  
        this.messages = [...this.messages, event.message as unknown as Message]
      });
      console.log(this.time)


      const filter = {
        type: 'messaging',
        members: { $in: [`${this.b.id}`] },
      };
      const sort = { last_message_at: -1 };

      this.channelList = await this.chatClient.queryChannels(filter, sort, {
        watch: true,
        state: true,
      });
    } catch (err) {
      console.log(err);
      return;
    }
  }
  sortArray(){

    for (let x in this.itemArray){
    
      if(this.itemArray[x].user.username == this.match){
        // this.itemList = new Array();
      this.chatId = this.itemArray[x]['chatId'];
      
        // for(let x in this.itemList){
        //   this.itemList[x].images.data =this.sanitizer.bypassSecurityTrustResourceUrl(this.itemList[x].images.data);
        // }

      }
      return this.chatId

    }
  }



  async sendMessage() {
    if (this.newMessage.trim() === '') {
      return;
    }
    console.log(this.newMessage)

    try {
      await this.channel.sendMessage({
        text: this.newMessage,
      });

      this.newMessage = '';
      this.messages = [...this.messages]
      console.log(this.messages[this.messages.length-1]['message'])
      // this.joinChat()

    } catch (err) {
      console.log(err);
    }

  }

  constructor() { }

  ngOnInit(): void {
    this.joinChat()
  }

}
