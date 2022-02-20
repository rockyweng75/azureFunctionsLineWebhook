const handleMessage = require('./handleMessage');
const unknown = require('./formats/unknown');
const lineClient = require('./lineClient');

module.exports = async function (event) {
    if(event.type === 'postback'){

    } else if (event.type === 'message'){
        return handleMessage(event);
    } else {
        return lineClient.replyMessage(event.replyToken, { type: 'text', text: unknown});
    }
  }
