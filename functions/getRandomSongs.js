
const rp = require('request-promise');
const { replySingerContent } = require('./replySingerContent.js');

exports.getRandomSongs = async function(event, songCount){
  // サーバーからsongcountだけ取得
  // メッセージの組み立て
  // TODO 音声ファイルも送信
  var replyMessage = [];
  var options = {
    method: 'POST',
    uri: 'http://' + process.env["serverIP"] + "/api/v1/bot/get_random_song",
    form: {
      userId: event.events[0].source.userId,
      song_count: songCount
    },
  };

  // サーバーからいいねされた曲を取得
  var infos = await rp(options);
  infos = JSON.parse(infos);
  console.log(infos);

  // 取得した歌たちをメッセに追加
  for(var info of infos){
    replyMessage.push(await replySingerContent(info.singer, info.song));
  }
  return replyMessage;

}
