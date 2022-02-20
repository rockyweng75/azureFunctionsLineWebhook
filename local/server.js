const express = require('express');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.json();

const line = require('@line/bot-sdk');
const config = require('../secrets/line');
const main = require('../SharedCode/main');

const app = express();
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(main))
    .then((result) => res.json(result));
});

app.post('/testwebhook', urlencodedParser, (req, res) => {
  Promise
    .all(req.body.events.map(main))
    .then((result) => {
      console.log(JSON.stringify(result));
      res.json(result);
    });
});

app.listen(3000, function () {
  console.log('[BOT已準備就緒]');
});