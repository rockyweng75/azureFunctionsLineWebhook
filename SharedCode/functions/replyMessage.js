const order = require('../formats/order');
const callAdmin = require('../formats/callAdmin');
const welcome = require('../formats/welcome');
const help = require('../formats/help');
const query = require('../functions/queryData');

module.exports = async function (type, message) {
    switch(type){
        case 'query': return await query(message); break;
        case 'order': return Promise.resolve(order); break;
        case 'callAdmin' : return Promise.resolve(callAdmin); break;
        case 'welcome' : return Promise.resolve(welcome); break;
        case 'help' : return Promise.resolve(help); break;
        default: null;
    }
}