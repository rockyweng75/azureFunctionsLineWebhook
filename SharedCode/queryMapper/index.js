const queryFormat = require('../formats/query');
const stocks = require('../keywords/query/stock');
const weathers = require('../keywords/query/weather');
const citys = require('../keywords/query/city');
const oils = require('../keywords/query/oil');

const token = require('../../secrets/weather');

const axios = require('axios');
const X2JS = require('x2js');
const moment = require('moment');
let m = moment();


module.exports = [
    {   
        word: stocks, 
        func : async (message) =>{
            return new Promise(resolve =>{
                axios.get('https://openapi.twse.com.tw/v1/exchangeReport/MI_INDEX')
                .then(json =>{
                    var obj = json.data.filter(item => item.指數 == '發行量加權股價指數')
                    if(obj.length > 0){
                        let result  = getResultComponent()
                        result.contents.header.contents.push({
                            type: 'text',
                            text: `今日大盤`
                        })
                        result.contents.body.contents.push({
                            type: 'text',
                            text: `指數:${obj[0].收盤指數}`
                        })
                        result.contents.body.contents.push({
                            type: 'text',
                            text: `漲跌:${obj[0].漲跌} ${obj[0].漲跌點數}`
                        })
                        result.contents.body.contents.push({
                            type: 'text',
                            text: `百分比:${obj[0].漲跌百分比}`
                        })
                        resolve(result)
                    }
                })
            })
        }
    },
    {
        word: weathers, 
        func : async (message) =>{
            return new Promise(resolve =>{
                let _params = clearKeyword(message, weathers);
                if(_params !== '') _params = findKeyByChineseRule(_params, citys);
                if(_params == '') _params = '雲林縣';
                var url=`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${token}&locationName=${_params}`;
                axios.get(encodeURI(url))
                .then(res =>{
                    var data = res.data.records
                    if(data){
                        let result  = getResultComponent()

                        result.contents.header.contents.push({
                            type: 'text',
                            text: `${data.location[0].locationName} - ${data.datasetDescription}`
                        })
                      
                        let elements = data.location[0].weatherElement;
                        let WxElements = elements.filter(o => o.elementName === 'Wx')[0];
                        let PopElements = elements.filter(o => o.elementName === 'PoP')[0];
                        let MinTElements = elements.filter(o => o.elementName === 'MinT')[0];
                        let MaxTElements = elements.filter(o => o.elementName === 'MaxT')[0];

                        let box = {
                          type: "box",
                          layout: "vertical",
                          spacing: "md",
                          contents: []
                        }
                        for(let i = 0; i < WxElements.time.length; i++){
                            let wx = WxElements.time[i];
                            let pop = PopElements.time[i];
                            let min = MinTElements.time[i];
                            let max = MaxTElements.time[i];

                            let childbox = {
                              type: "box",
                              layout: "vertical",
                              spacing: "md",
                              contents: []
                            };

                            childbox.contents.push({
                                type: 'text',
                                text: `${moment(wx.startTime).format('MM月DD日HH時')} - ${moment(wx.endTime).format('MM月DD日HH時')}`
                            })
                            childbox.contents.push({
                              type: "separator"
                            });
                            childbox.contents.push({
                              type: 'text',
                              text: `天氣: ${wx.parameter.parameterName}`
                            });
                            childbox.contents.push({
                              type: "separator"
                            });
                            childbox.contents.push({
                              type: 'text',
                              text: `降雨機率： ${pop.parameter.parameterName}%`
                            });
                            childbox.contents.push({
                              type: "separator"
                            });
                            childbox.contents.push({
                              type: 'text',
                              text: `溫度${min.parameter.parameterName}度c ~ ${max.parameter.parameterName}度c`
                            });
                            childbox.contents.push({
                                type: "separator"
                            });
                            box.contents.push(childbox);
                        }
                        result.contents.body.contents.push(box);
                        resolve(result)
                    }
                })
            })
        }
    },
    {
        word: oils, 
        func : async (message) =>{
            return new Promise(resolve =>{
                var url=`https://vipmember.tmtd.cpc.com.tw/opendata/ListPriceWebService.asmx/getCPCMainProdListPrice_XML`;
                axios.get(encodeURI(url))
                .then(res =>{
                    var x2js = new X2JS();
                    
                    let data = x2js.xml2js(res.data);
                    let list = data.Dataset.Table.filter((o,index) => index < 5);

                    if(data){
                        let result  = getResultComponent()
                        result.contents.header.contents.push({
                            type: 'text',
                            text: `${list[0].牌價生效時間}起生效`
                        })
                        let elements = []
                        let _98 = list.filter(o => o.產品名稱 === '98無鉛汽油')[0];
                        let _95 = list.filter(o => o.產品名稱 === '95無鉛汽油')[0];
                        let _92 = list.filter(o => o.產品名稱 === '92無鉛汽油')[0];
                        let _diesel = list.filter(o => o.產品名稱 === '超級柴油')[0];
                        elements.push(_98);
                        elements.push(_95);
                        elements.push(_92);
                        elements.push(_diesel);

                        let box = {
                          type: "box",
                          layout: "vertical",
                          spacing: "md",
                          contents: []
                        }
                        for(let i = 0; i < elements.length; i++){
                            let el = elements[i];

                            let childbox = {
                              type: "box",
                              layout: "vertical",
                              spacing: "md",
                              contents: []
                            };
                            childbox.contents.push({
                                type: 'text',
                                text: `${el.產品名稱}: $${el.參考牌價} ${el.計價單位}`
                            })
                            childbox.contents.push({
                              type: "separator"
                            });
                          
                            box.contents.push(childbox);
                        }
                        result.contents.body.contents.push(box);
                        resolve(result)
                    }
                })
            })
        }
    }
]

const clearKeyword = (text, keywords) =>{
    let pams = text;
    for(let i = 0; i < keywords.length; i ++){
        let key = keywords[i];
        if(pams == '') break;
        pams = pams.replace(key, '');
    }
    return pams;
}

const findKeyByChineseRule = (text, keywords) =>{
  var result = keywords.filter(o => text.indexOf(o) >= 0);
  return result.length > 0 ? result[0] : null;
}

const getResultComponent = () =>{
    queryFormat.contents.header.contents = [];
    queryFormat.contents.body.contents = [];

    return queryFormat;
}
  
