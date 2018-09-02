const AWS = require('aws-sdk');
const S3 = new AWS.S3();
var dynamo = new AWS.DynamoDB.DocumentClient();
const rp = require('request-promise');

const { replySingerContent } = require('./functions/replySingerContent.js');
const { getLatestSongs } = require('./functions/getLatestSongs.js');
const { getRandomSongs } = require('./functions/getRandomSongs.js');
const { getHowToUse } = require('./functions/getHowToUse.js');

const LINE = require('@line/bot-sdk');
// Messaging API のアクセストークン
var channelAccessToken = process.env["channelAccessToken"];
const LINE_CLIENT = new LINE.Client({channelAccessToken: channelAccessToken});

exports.handler = async function(event) {
  let response = { statusCode: 200 };
  var replyMessage = [];

  try{
    // メッセージがテキストだった時
    if(event.events[0].message.type === "text"){
      var requestMsg = event.events[0].message.text;

      if(requestMsg === "1"){
        
        replyMessage = await getLatestSongs(event);
        console.log(replyMessage);

      } else if(requestMsg === "2"){

        // ランダムで１曲取得
        replyMessage = await getRandomSongs(event, 1);

      } else if(requestMsg === "3"){

      } else if(requestMsg === "4"){

        // アプリの使い方を説明
        replyMessage = await getHowToUse(event);

      }

    } else {
      replyMessage.push({ 'type': 'text', 'text': "テキストメッセージを入力してください。" });
    }
  }catch(e){
    replyMessage.push({ 'type': 'text', 'text': "申し訳ございません。エラーが発生しました。" });
    console.log(e)
  }

  // Botにメッセージをリプライ
  await LINE_CLIENT.replyMessage(event.events[0].replyToken, replyMessage);

  return response;
};

