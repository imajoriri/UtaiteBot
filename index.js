const AWS = require('aws-sdk');
const S3 = new AWS.S3();
var dynamo = new AWS.DynamoDB.DocumentClient();

const LINE = require('@line/bot-sdk');
// Messaging API のアクセストークン
var channelAccessToken = process.env["channelAccessToken"];
const LINE_CLIENT = new LINE.Client({channelAccessToken: channelAccessToken});

exports.handler = async function(event) {
  let response = { statusCode: 200 };
  var replyMessage = [];

  // メッセージがテキストだった時
  if(event.events[0].message.type === "text"){
    var requestMsg = event.events[0].message.text;

    var responseServer = [
      {
        singer: {
          twitter_url: "https://twitter.com/imasirooo",
          twitter_name: "imasirooo",
        },
        song: {
          detail_url: "https://hogehoge",
        }
      }
    ]

    if(requestMsg === "1"){
      // 過去最新の聞いた３件を取得
      var singerContent = await replySingerContent(responseServer[0].singer, responseServer[0].song);
      console.log(singerContent);
      replyMessage.push(singerContent);
    } else if(requestMsg === "2"){
      // 過去最新のいいねの３件を取得
    }

    replyMessage.push({ 'type': 'text', 'text': requestMsg });
  } else {
    replyMessage.push({ 'type': 'text', 'text': "テキストメッセージを入力してください。" });
  }

  // Botにメッセージをリプライ
  await LINE_CLIENT.replyMessage(event.events[0].replyToken, replyMessage);

  return response;
};

// singerとsongを指定してメッセージコンテンツを取得
// 必須: singer >> twitter_url, twitter_name
//       song   >> detail_url
// TODO >> メッセージの文を修正する
async function replySingerContent(singer, song){
  var twitterURL = singer.twitter_url || "https://hogehgoe";
  var imageURL = await getTwitterImage(singer.twitter_name) || "https://hogehgoe";

  var message = {
    type: "template",
    altText: `曲をいいねしました。`,
    template: {
      type: "buttons",
      actions: [
        {
          type: "uri",
          label: `プロフィールを見る!!`,
          uri: isHTTPS(twitterURL),
        }, ], thumbnailImageUrl: isHTTPS(imageURL), title: `曲をいいねしました。`,
      text: `をいいねしました。`
    }
  }

  // songURLがあったらボタンとして追加
  if(song.detail_url){
    message.template.actions.push({
      type: "uri",
      label: `曲をもっと聞きたい!!`,
      uri: isHTTPS(song.detail_url),
    })
  }

  return message;
}

// https」から始まるかを検証
//exports.isHTTPS = (url) => {
function isHTTPS(url){
  if(url.indexOf('https') != -1){
    return url;
  }else{
    return "https://hogehoge"
  }
}

// twitterのIDより、twitterのトプ画を取得
//exports.getTwitterImage = function getTwitterImage(twitterName){
function getTwitterImage(twitterName){
  return new Promise( (resolve, reject) => {
    let https = require('https');
    var url = "https://twitter.com/" + twitterName + "/profile_image?size=original";
    https.get(url, (res) => {
      let body = '';
      res.setEncoding('utf8');

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', (res) => {
        const cheerio = require('cheerio')
        const $ = cheerio.load(body)
        var imageURL = $("a").attr("href");;
        resolve(imageURL);
      });
    }).on('error', (e) => {
      console.log(e); //エラー時
      reject('https://hogehoge');
    });
  });

}
