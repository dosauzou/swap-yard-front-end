const webpush = require('web-push');

const vapidKeys = {
    "publicKey":"BLBx-hf2WrL2qEa0qKb-aCJbcxEvyn62GDTyyP9KTS5K7ZL0K7TfmOKSPqp8vQF0DaG8hpSBknz_x3qf5F4iEFo",
    "privateKey":"PkVHOUKgY29NM7myQXXoGbp_bH_9j-cxW5cO-fGcSsA"
};

const express = require("express");

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const app = express();

//express endpoint
//basically just a shortcut and the endpoint still needs to be triggered
app.route('/api/newsletter').post(sendNewsletter);

//posts this thingy
export function sendNewsletter(req, res) {

    const allSubscriptions = get subscriptions from database 

    console.log('Total subscriptions', allSubscriptions.length);

    const notificationPayload = {
        "notification": {
            "title": "Angular News",
            "body": "Newsletter Available!",
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

//an endpoint that is triggered by the backend finding a match, it should recieve the match names
//that should be fed into the json and made into a notification