const AWS = require('aws-sdk');
const S3 = new AWS.S3();
var dynamo = new AWS.DynamoDB.DocumentClient();
const rp = require('request-promise');

const { replySingerContent } = require('./functions/replySingerContent.js');
const { getLatestSongs } = require('./functions/getLatestSongs.js');
const { getRandomSongs } = require('./functions/getRandomSongs.js');
const { getHowToUse } = require('./functions/getHowToUse.js');
const { getAllLikedSongs } = require('./functions/getAllLikedSongs.js');
const { postMessageLog } = require('./functions/postMessageLog.js');
const { postCreateUser } = require('./functions/postCreateUser.js');

const LINE = require('@line/bot-sdk');
// Messaging API のアクセストークン

exports.handler = async function(event, context, callback) {
  const alias = context.invokedFunctionArn.split(':').pop();
  console.log(alias);
  const channelAccessToken = process.env["channelAccessToken" + "_" + alias];
  const LINE_CLIENT = new LINE.Client({channelAccessToken: channelAccessToken});

  const serverIP = process.env["serverIP" + "_" + alias];

  let response = { statusCode: 200 };
  var replyMessage = [];

  try{
    console.log(event);

    // 友達追加された時
    if(event.events[0].type === "follow"){
      // TODO userをcreate
      postCreateUser(event, serverIP);
      console.log("----------add firend--------");
      //replyMessage.push({ 'type': 'text', 'text': "友達追加ありがとうございます。" });
    }else{

      // メッセージがテキストだった時
      if(event.events[0].message.type === "text"){
        // serverにメッセのログを送信
        postMessageLog(event, serverIP);

        var requestMsg = event.events[0].message.text;

        if(requestMsg === "1" || requestMsg === "history"){

          // 履歴を取得
          replyMessage = await getLatestSongs(event, serverIP);
        } else if(requestMsg === "2" || requestMsg === "random"){

          // ランダムで１曲取得
          replyMessage = await getRandomSongs(event, serverIP, 1);
        } else if(requestMsg === "3" || requestMsg === "like"){

          // いいねした曲取得
          replyMessage = await getAllLikedSongs(event, serverIP);
        } else if(requestMsg === "4" || requestMsg === "how"){

          // アプリの使い方を説明
          replyMessage = await getHowToUse(event);

        } else if(requestMsg === "5"){
          replyMessage = await getAllLikedSongs(event, serverIP);
        }else{
          // リッチメニューから以外のアクセス
        }

      } else {
        replyMessage.push({ 'type': 'text', 'text': "テキストメッセージを入力してください。" });
      }
    }
  }catch(e){
    //replyMessage.push({ 'type': 'text', 'text': "申し訳ございません。エラーが発生しました。" });
    replyMessage = [{ 'type': 'text', 'text': "申し訳ございません。エラーが発生しました。" }];
    console.log(e)
  }

  // Botにメッセージをリプライ
  await LINE_CLIENT.replyMessage(event.events[0].replyToken, replyMessage);

  return response;
};

