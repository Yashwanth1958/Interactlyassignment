const twilio = require('twilio');

//const accountSid = 'ACf9af391180a9b05d7af4a4e7b77458b5';
//const authToken = '39eba8de39c268b837e875550115014b';
const client = new twilio(accountSid, authToken);

client.calls.create({
    url: 'http://demo.twilio.com/docs/voice.xml', 
    to: '+91 86880 09078', 	

    from: '+12514283831', 
    method: 'POST',
    statusCallback: 'https://your_webhook_url.com/statusCallback', 
    statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed']
}).then(call => console.log(call.sid))
  .catch(err => console.error(err));
