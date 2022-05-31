require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const webpush = require('web-push');
const allSubscriptions : string[] = [];
console.log( process.env.VAPID_PUBLIC_KEY)



app.use(bodyParser.json());

//REST API
//anytime this endpoint is triggered it shouldpost notifications
app.post('/notification',(sendNewsletter))

app.get('/getData', (req, res)=>{
    res.json({
        "statusClear": 200
    })
})

app.listen(3000, () => {
    console.log('listening on port 3000');
  });

 
  export function sendNewsletter(req, res) {

    webpush.setVapidDetails(
        'mailto:d.osauzou@gmail.com',
        process.env.VAPID_PUBLIC_KEY,
        process.env.VAPID_PRIVATE_KEY
    );
    

      const subscription = req.body
      allSubscriptions.push(subscription)

 
      const notificationPayload = {
        "notification": {
            "title": "New match has been made",
            "body": "Check notifcation panel for a new match!",
            "icon": "assets/main-page-logo-small-hat.png",
            "vibrate": [100, 50, 100],
            "data": {
                "dateOfArrival": Date.now(),
                "primaryKey": 1
            },
            "actions": [{
                "action": "explore",
                "title": "Go to the site"
            }]
        }
    };


    Promise.all(allSubscriptions.map(sub => webpush.sendNotification(
        sub, JSON.stringify(notificationPayload) )))
        .then(() => res.status(200).json({message: 'Newsletter sent successfully.'}))
        .catch(err => {
            console.error("Error sending notification, reason: ", err);
            res.sendStatus(500);
        });
}

//posts this thingy


//an endpoint that is triggered by the backend finding a match, it should recieve the match names
//that should be fed into the json and made into a notification