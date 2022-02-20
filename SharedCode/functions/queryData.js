const queryKeyword = require('../keywords/query');
const queryMapper = require('../queryMapper/index');

module.exports = async function (message) {
    var queryItem = message.text.toUpperCase();
    queryKeyword.forEach(word =>{
        queryItem = queryItem.replace(word, '');
    })

    queryItem = queryItem.replace("Q", '');

    if(queryItem.length == 0){
        return Promise.resolve({
            type: "text",
            text: "你可以輸入「股市」或「天氣」進行查詢",
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
        for(let k = 0; k < o.word.length; k += 1){
            let key = o.word[k];
            if(queryItem.indexOf(key) >= 0){
                await o.func(queryItem).then(res => result = res);
                break;
            }
        }
    }
    return Promise.resolve(result);
}

