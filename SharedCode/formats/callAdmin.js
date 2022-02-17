module.exports = 
{
  "type": "flex",
  "altText": "聯絡小編",
  "contents": {
    "type": "bubble",
    "header": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "聯絡小編"
        }
      ]
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "通關密語：我愛吃巧克力蛋炒飯"
        },
      ]
    },
    "footer": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "button",
          "action": {
            "type": "postback",
            "label": "聯絡昌哥",
            "data": "action=callAdmin"
          },
          "style": "primary",
          "color": "#0000ff"
        }
      ]
    },
  }
}
