const express =  require("express");
const bodyParser = require('body-parser');
const app = express();
app.use('/', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const client = require('twilio')(
    "AC082d1c1499533a16e146ad7fb88a068b",
    "1f85a07f5194a6c632636360b2b8f930"
);


app.post('/messages', (req, res) => {
  console.log(req.body)
  client.messages
    .create({
      from: "+14086375612",
      to: "+923134484655",
      body: "Hello Jeee"
    })
    .then(() => {
      res.json(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.json(JSON.stringify({ success: false }));
    });
});

app.listen(3001, () => console.log("Established"));
