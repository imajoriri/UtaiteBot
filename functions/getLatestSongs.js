const rp = require('request-promise');
const { replySingerContent } = require('./replySingerContent.js');

exports.getLatestSongs = async function(event){
  var replyMessage = [];
  // 過去最新の聞いた３件を取得
  var options = {
    method: 'POST',
    uri: 'http://' + process.env["serverIP"] + "/api/v1/bot/get_liked_song",
    form: {
      userId: event.events[0].source.userId,
      song_count: 3
    },
  };

  // サーバーからいいねされた曲を取得
  var likedInfos = await rp(options);
  likedInfos = JSON.parse(likedInfos);
  console.log(likedInfos);

  // 取得した歌たちをメッセに追加
  for(var likedInfo of likedInfos){
    replyMessage.push(await replySingerContent(likedInfo.singer, likedInfo.song));
  }
  return replyMessage;
}
