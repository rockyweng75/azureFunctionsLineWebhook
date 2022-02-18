const queryKeyword = require('../keywords/query');
const queryFormat = require('../formats/query');
const axios = require('axios');

const queryMapper = [
    {   
        word: '大盤', 
        func : async () =>{
            return new Promise(resolve =>{
                axios.get('https://openapi.twse.com.tw/v1/exchangeReport/MI_INDEX')
                .then(json =>{
                    var obj = json.data.filter(item => item.指數 == '發行量加權股價指數')
                    if(obj.length > 0){
                        queryFormat.contents.header.contents.push({
                            type: 'text',
                            text: `今日大盤`
                        })
                        queryFormat.contents.body.contents.push({
                            type: 'text',
                            text: `指數:${obj[0].收盤指數}`
                        })
                        queryFormat.contents.body.contents.push({
                            type: 'text',
                            text: `漲跌:${obj[0].漲跌} ${obj[0].漲跌點數}`
                        })
                        queryFormat.contents.body.contents.push({
                            type: 'text',
                            text: `百分比:${obj[0].漲跌百分比}`
                        })
                        resolve(queryFormat)
                    }
                })
            })
        }
    } 
]

module.exports = async function (message) {
    var queryItem = message.text.toUpperCase();
    queryKeyword.forEach(word =>{
        queryItem = queryItem.replace(word, '');
    })

    queryItem = queryItem.replace("Q", '');

    if(queryItem.length == 0){
        return Promise.resolve({
            type: "text",
            text: "你可以使用「查詢大盤」或「Q大盤」進行查詢",
        })
    } else {

        var result = await findMapperContent(queryItem);

        if(result == null){
            result = {
                type: "text",
                text: "找不到可查詢的內容",
            }
        }
        return Promise.resolve(result)

    }
}

const findMapperContent = async (queryItem) => {
    var result = null;
    for(let i = 0; i < queryMapper.length; i += 1) {
        var o = queryMapper[i];
        if(queryItem.indexOf(o.word) >= 0){
            await o.func().then(res => result = res);
        }
    }
    return Promise.resolve(result);
}

