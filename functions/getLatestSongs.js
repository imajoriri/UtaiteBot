const rp = require('request-promise');
const { replySingerContent } = require('./replySingerContent.js');

exports.getLatestSongs = async function(event, serverIP){
  // 過去最新の聞いた３件を取得
  var options = {
    method: 'POST',
    uri: 'http://' + serverIP + "/api/v1/bot/get_logs_song",
    form: {
      userId: event.events[0].source.userId,
      song_count: 3
    },
  };

  var replyMessage = [];

  // サーバーからいいねされた曲を取得
  var likedInfos = await rp(options).then( async likedInfos => {
    likedInfos = JSON.parse(likedInfos);
    console.log("---likedInfos---");
    console.log(likedInfos);
    if(likedInfos.length === 0){
      replyMessage.push({ 'type': 'text', 'text': "曲の履歴が0件でした。" });
    }
    for(var likedInfo of likedInfos){
      replyMessage.push(await replySingerContent(likedInfo.singer, likedInfo.song));
    }
  }).catch( err => {
    console.log(err);
    replyMessage.push({ 'type': 'text', 'text': "曲を取得することができませんでした。" });
  });
  //likedInfos = JSON.parse(likedInfos);
  //console.log(likedInfos);

  // 取得した歌たちをメッセに追加
  //for(var likedInfo of likedInfos){
  //  replyMessage.push(await replySingerContent(likedInfo.singer, likedInfo.song));
  //}
  return replyMessage;
}
