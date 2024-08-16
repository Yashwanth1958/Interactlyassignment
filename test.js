const twilio = require('twilio');
const accountSid = 'ACf9af391180a9b05d7af4a4e7b77458b5';
const authToken = '39eba8de39c268b837e875550115014b';
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'HI WELCOME TO TWILLO',
        from: '+12514283831',
        to: '+918688009078'
    })
    .then(message => console.log(message.sid))
    