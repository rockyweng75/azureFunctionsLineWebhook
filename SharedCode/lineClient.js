const line = require('@line/bot-sdk');
const config = require('../secrets/line');

module.exports = new line.Client(config);
