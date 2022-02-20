const decideMessage = require('./functions/decideMessage');
const replyMessage = require('./functions/replyMessage');
const lineClient = require('./lineClient');

module.exports = async function (event) {
    var type = await decideMessage(event.message);
    var msg = await replyMessage(type, event.message);
    if(event.debug === true){
        return msg;
    } else {
        return lineClient.replyMessage(event.replyToken, msg);
    }
}
