
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const webpush = require('web-push');
const allSubscriptions : string[] = [];
const vapidKeys = 
{
  publicKey: 'BI1hXbInwBYDsij14G5aCAXxn4IxcuI4jeOrUFTFIfVfVr6TCgvOCSgjLyuh1Who00G4QsdggDkOTGiF2VM1I1s',
  privateKey: 'ndihhY4sSmyAg42Va-cXKyKoyUUzdKeRvJzytvKNNvg'
};


//successfully hit the node express endpoint
webpush.setVapidDetails(
    'mailto:d.osauzou@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

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
    //   console.log(res.body)

      const subscription = req.body
      allSubscriptions.push(subscription)
      console.log(allSubscriptions)

 
    const notificationPayload =
 
    {
        "notification": {
            "title": "New match"
            // "body": "A new match has been made!",
            // "icon": "assets/main-page-logo-small-hat.png",
            // "vibrate": [100, 50, 100],
            // "data": {
            //     "dateOfArrival": Date.now(),
            //     "primaryKey": 1
            // },
            // "actions": [{
            //     "action": "explore",
            //     "title": "Go to the site"
            // }]
        }
    };

    console.log(JSON.stringify(notificationPayload))

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