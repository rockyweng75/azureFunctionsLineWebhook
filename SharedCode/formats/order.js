module.exports = 
{
    "type": "flex",
    "altText": "菜單範本",
    "contents": {
        "type": "bubble",
        "hero": {
            "type": "image",
            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_2_restaurant.png",
            "size": "full",
            "aspectRatio": "20:13",
            "aspectMode": "cover",
            "action": {
            "type": "uri",
            "label": "Action",
            "uri": "https://linecorp.com"
            }
        },
        "body": {
            "type": "box",
            "layout": "vertical",
            "spacing": "md",
            "action": {
            "type": "uri",
            "label": "Action",
            "uri": "https://linecorp.com"
            },
            "contents": [
            {
                "type": "text",
                "text": "大王漢堡寶",
                "weight": "bold",
                "size": "xl",
                "contents": []
            },
            {
                "type": "box",
                "layout": "vertical",
                "spacing": "sm",
                "contents": [
                {
                    "type": "box",
                    "layout": "baseline",
                    "contents": [
                    {
                        "type": "text",
                        "text": "小份",
                        "weight": "bold",
                        "flex": 0,
                        "margin": "sm",
                        "contents": []
                    },
                    {
                        "type": "text",
                        "text": "$10.5",
                        "weight": "bold",
                        "margin": "sm",
                        "contents": []
                    },
                    {
                        "type": "text",
                        "text": "400卡",
                        "size": "sm",
                        "color": "#AAAAAA",
                        "align": "end",
                        "contents": []
                    }
                    ]
                },
                {
                    "type": "box",
                    "layout": "baseline",
                    "contents": [
                    {
                        "type": "text",
                        "text": "大份",
                        "weight": "bold",
                        "flex": 0,
                        "margin": "sm",
                        "contents": []
                    },
                    {
                        "type": "text",
                        "text": "$15.5",
                        "weight": "bold",
                        "flex": 0,
                        "margin": "sm",
                        "contents": []
                    },
                    {
                        "type": "text",
                        "text": "550卡",
                        "size": "sm",
                        "color": "#AAAAAA",
                        "align": "end",
                        "contents": []
                    }
                    ]
                }
                ]
            },
            {
                "type": "text",
                "text": "Sauce, Onions, Pickles, Lettuce & Cheese",
                "size": "xxs",
                "color": "#AAAAAA",
                "wrap": true,
                "contents": []
            }
            ]
        },
        "footer": {
            "type": "box",
            "layout": "vertical",
            "contents": [
            {
                "type": "spacer",
                "size": "xxl"
            },
            {
                "type": "button",
                "action": {
                "type": "uri",
                "label": "加入訂單",
                "uri": "https://linecorp.com"
                },
                "color": "#905C44",
                "style": "primary"
            }
            ]
        }
    }
}