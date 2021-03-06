require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { StreamChat } = require('stream-chat');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// initialize Stream Chat SDK

const serverSideClient = new StreamChat(
  process.env.STREAM_API_KEY,
  process.env.STREAM_APP_SECRET
);
//create a unique match id, so like 

app.post('/join', async (req, res) => {
  console.log(  process.env.STREAM_API_KEY
    )
    console.log(req.body.username)

    //add another const
  const username  = req.body.username as string;
  const { chatId } = req.body.chatId;


  const token = serverSideClient.createToken(username);
//   try {
//     await serverSideClient.updateUser(
//       {
//         id: username,
//         name: username,
//       },
//       token
//     );
//   } catch (err) {
//     console.log(err);
//   }

  const channel = serverSideClient.channel('messaging', chatId, {
    name: 'Talk Shop'
  });

  try {
    await channel.addMembers([username, 'user']);
    await channel.query();

  } catch (err) {
    console.log(err);
  }

  return res
    .status(200)
    .json({ user: { username }, token, api_key: process.env.STREAM_API_KEY });
});

const server = app.listen(process.env.PORT || 5500, () => {
  const { port } = server.address();
  console.log(`Server running on PORT ${port}`);
});