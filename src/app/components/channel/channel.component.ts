import { Component, Input, OnInit } from '@angular/core';
import axios from 'axios';
import { Console } from 'console';
import { Match } from 'src/app/classes/match';
import { StreamChat, ChannelData, Message, User, Channel, UserFromToken } from 'stream-chat';
@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {
  @Input() match = new Match();
  @Input() allMatches = new Array<Match>();

  title = 'angular-chat';
  channel: Channel;
  username = sessionStorage.getItem('id');
  messages: Message[] = [];
  newMessage = '';
  channelList: ChannelData[];
  chatClient: any;
  b: any
  currentUser: User;
  time: Date;


  async joinChat() {
console.log(this.match)

    var xchatId = this.sortArray()
    const { username } = this;
    const chatId = xchatId;

    try {
      const response = await axios.post('http://localhost:5500/join', {
        username,
        chatId
      });
      const { token } = response.data;
      const apiKey = response.data.api_key;
      console.log('joining chat...')
      console.log(apiKey)
      this.chatClient = new StreamChat(apiKey)
      console.log('heres the chat client', this.chatClient)
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
      const channel = this.chatClient.channel('messaging', chatId);
      console.log(channel)
      await channel.watch();
      this.channel = channel;
      this.messages = channel.state.messages;
      this.channel.on('message.new', event => {

        this.messages = [...this.messages, event.message as unknown as Message]
      });

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
  sortArray() {

    let z: Match;
    var b = this.allMatches.map(p => {
      if (p.user.username == this.match.user.username
      )
        z = p
    })


    return z.chatId

  }




  async sendMessage() {
    if (this.newMessage.trim() === '') {
      return;
    }

    try {
      await this.channel.sendMessage({
        text: this.newMessage,
      });

      this.newMessage = '';
      this.messages = [...this.messages]
      console.log(this.messages[this.messages.length - 1]['message'])
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
