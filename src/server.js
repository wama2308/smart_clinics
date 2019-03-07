const Pusher = require('pusher');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');


const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const pusher = new Pusher({
  appId: '712739',
  key: '5bcdc3131ca4f64ce87c',
  secret: '1a6de844eb28f5ada29c',
  cluster: 'us2',
  encrypted: true
});

app.set('PORT', process.env.PORT || 5000);


app.post('/message', (req, res) => {
	//console.log(req.body);
	const payload = req.body;
	pusher.trigger('chat', 'messagee', payload);
	res.send(payload)

});

app.post('/listCharges', (req, res) => {
	//console.log(req.body);
	const payload = req.body;
	pusher.trigger('charges', 'dataCharges', payload);
	//console.log(payload);
	res.send(payload)

});

app.post('/listPersonal', (req, res) => {
	//console.log(req.body);
	const payload = req.body;
	pusher.trigger('personal', 'dataPersonal', payload);
	//console.log(payload);
	res.send(payload)

});

app.listen(app.get('PORT'), () => 
  console.log('Listening at ' + app.get('PORT')))


