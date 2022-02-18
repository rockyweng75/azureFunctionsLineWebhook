const handleMessage = require('./handleMessage');

module.exports = async function (event) {
    if(event.type === 'postback'){

    } else if (event.type === 'message'){
        return handleMessage(event);
    } else {
        return Promise.resolve(null);
    }
  }
