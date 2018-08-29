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
  if(event.events[0].message.type === "text"){
    var requestMsg = event.events[0].message.text;

    replyMessage.push({ 'type': 'text', 'text': requestMsg });
  }

  // Botにメッセージをリプライ
  await LINE_CLIENT.replyMessage(event.events[0].replyToken, replyMessage);

  return response;
};
