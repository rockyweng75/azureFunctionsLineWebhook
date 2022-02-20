const order = require('../keywords/order');
const callAdmin = require('../keywords/callAdmin');
const welcome = require('../keywords/welcome');
const help = require('../keywords/help');
const query = require('../keywords/query');

module.exports = async function (message) {
    if(message.type === 'text'){
        var input = message.text.toUpperCase();
        if(order.indexOf(input) >= 0 || input == "O"){
            return Promise.resolve("order");
        } else if(welcome.indexOf(input) >= 0){
            return Promise.resolve("welcome");
        } else if(callAdmin.indexOf(input) >= 0){
            return Promise.resolve("callAdmin");
        } else if(help.indexOf(input) >= 0 || input == "I"){
            return Promise.resolve("help");
        } else {
            return Promise.resolve("query");
        }
    } else {
        return Promise.resolve(null);
    }
}