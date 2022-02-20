const axios = require('axios');

axios({
    method: 'post',
    url: 'http://localhost:3000/testwebhook',
    data: {
       events: [
         {  
            type: 'message',
            message: {
              type: 'text',
              id: '15611326961422',
              text: '天氣' 
            },
            timestamp: 1645189538175,
            source: {
              type: 'user',
              userId: 'Ubc2366201a3686dc669df9fe35b4b072' 
            },
            replyToken: '25a5233ae7c140b6b5e55a49fcc748c9',
            mode: 'active',
            debug: true
          }
        ]
      }
  }).then(res=>{
    console.log(res.body)
  })

  
