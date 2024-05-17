# Email Notification Microservice
This repository contains an email notification microservice and a typing game that uses the microservice to send results via email. 

## Microservice Overview
The email notification microservice allows other programs to send success or failure emails. It uses Node.js, Express.js, and Nodemailer.

### How to Programmatically REQUEST Data from the Microservice
You can request the microservice to send an email by making a `POST` request to the `/send-email` endpoint. The request should include the recipient's email address, the subject of the email, and the message content.

#### Example Call
```javascript
const axios = require('axios');

axios.post('http://localhost:3000/send-email', {
  to: 'recipient@example.com',
  subject: 'Results Completed',
  message: 'Your typing test has been completed. Here are the results...'
})
.then(response => {
  console.log('Email sent:', response.data);
})
.catch(error => {
  console.error('Error sending email:', error);
});  
```


### How to Programmatically RECEIVE Data from the Microservice
To receive data from the microservice, you can make a GET request to the /get-data endpoint. This is an example endpoint that returns sample data.

### Exampple Call
```javascript
const axios = require('axios');

axios.get('http://localhost:3000/get-data')
  .then(response => {
    console.log('Data received:', response.data);
  })
  .catch(error => {
    console.error('Error receiving data:', error);
  });
```
