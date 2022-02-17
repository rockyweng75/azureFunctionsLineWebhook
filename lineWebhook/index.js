const line = require('@line/bot-sdk');
const main = require('../SharedCode/main');
const config = require('../secrets/line');

module.exports = async function (context, req) {
    const signature = req.headers["x-line-signature"]
    if (line.validateSignature(JSON.stringify(req.body), config.channelSecret, signature)) {
        Promise
            .all(req.body.events.map(main))
            .then((result) => res.json(result));
    }
    context.res = { status: 200, body: 'ok' };
};

