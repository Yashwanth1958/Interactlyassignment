const twilio = require('twilio');

//const authToken = '39eba8de39c268b837e875550115014b';
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'HI swetha how are you this is your brother from godavarikhani it is just a text sample',
        from: '+12514283831',
        to: '+919652201241'
    })
    .then(message => console.log(message.sid))
    