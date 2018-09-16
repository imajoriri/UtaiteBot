
const rp = require('request-promise');
const { replySingerContent } = require('./replySingerContent.js');

exports.getRandomSongs = async function(event, serverIP, songCount){
  // サーバーからsongcountだけ取得
  // メッセージの組み立て
  // TODO 音声ファイルも送信
  var replyMessage = [];
  var options = {
    method: 'POST',
    uri: 'http://' + serverIP + "/api/v1/bot/get_random_song",
    form: {
      userId: event.events[0].source.userId,
      song_count: songCount
    },
  };

  // サーバーからいいねされた曲を取得
  var infos = await rp(options).then( async likedInfos => {
    likedInfos = JSON.parse(likedInfos);
    console.log("---likedInfos---");
    console.log(likedInfos);
    for(var likedInfo of likedInfos){
      replyMessage.push(await replySingerContent(likedInfo.singer, likedInfo.song));
    }
  }).catch( err => {
    console.log(err);
    replyMessage.push({ 'type': 'text', 'text': "曲を取得することができませんでした。" });
  });

  if(replyMessage.length === 0){
    replyMessage.push({ 'type': 'text', 'text': "曲を取得することができませんでした。" });
  }

  return replyMessage;

}
