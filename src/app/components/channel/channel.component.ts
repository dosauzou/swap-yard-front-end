import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { StreamChat, ChannelData, Message, User, Channel, UserFromToken } from 'stream-chat';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {
  title = 'angular-chat';
  channel: Channel;
  username = sessionStorage.getItem('id');
  messages: Message[] = [];
  newMessage = '';
  channelList: ChannelData[];
  chatClient: any;
  b: any
  currentUser: User;

  async joinChat() {
    console.log(this.username)
    const { username } = this;
    try {
      const response = await axios.post('http://localhost:5500/join', {
        username,
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

      //create specific channel per person
      const channel = this.chatClient.channel('team', 'talkshop');
      await channel.watch();
      this.channel = channel;
      this.messages = channel.state.messages;
      this.channel.on('message.new', event => {
        
        this.messages = [...this.messages, event]
      });
      

      const filter = {
        type: 'team',
        members: { $in: [`${this.currentUser.id}`] },
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
    } catch (err) {
      console.log(err);
    }
  }

  constructor() { }

  ngOnInit(): void {
    this.joinChat()
  }

}
