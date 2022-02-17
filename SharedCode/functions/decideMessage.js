const orderKeywords = ['菜單', 'O']
const helpKeywords = ['指令', 'I', 'HELP', '幫助']

const welcomeKeywords = ['你好', '妳好', '您好', '早安', '午安', '晚安', '貴安', 'HI', 'HELLO']
const callAdminKeywords = ['客服']

module.exports = async function (message) {
    if(message.type === 'text'){
        var input = message.text.toUpperCase();
        if(orderKeywords.indexOf(input) >= 0){
            return Promise.resolve("order");
        } else if(welcomeKeywords.indexOf(input) >= 0){
            return Promise.resolve("welcome");
        } else if(callAdminKeywords.indexOf(input) >= 0){
            return Promise.resolve("callAdmin");
        } else if(helpKeywords.indexOf(input) >= 0){
            return Promise.resolve("help");
        } else {
            return Promise.resolve(null);
        }
    } else {
        return Promise.resolve(null);
    }
}