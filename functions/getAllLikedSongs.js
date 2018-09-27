const rp = require('request-promise');

exports.getAllLikedSongs = async function(event, serverIP){
  var contents = [];
  var replyMessage = [];

  var options = {
    method: 'POST',
    uri: 'http://' + serverIP + "/api/v1/bot/get_all_liked_songs",
    form: {
      userId: event.events[0].source.userId,
      song_count: 5,
    },
  };

  // サーバーからいいねされた曲を取得
  var infos = await rp(options).then( async likedInfos => {
    likedInfos = JSON.parse(likedInfos);
    console.log("---likedInfos---");
    console.log(likedInfos);

    for(var likedInfo of likedInfos){
      // 曲のタイトル
      contents.push(
        {
          "type": "text",
          "text": likedInfo.song.name,
          "weight": "bold",
          "size": "xl",
          "margin": "lg",
        }
      );
      // シンガーの名前
      contents.push(
        {
          "type": "text",
          "text": likedInfo.singer.name,
          "weight": "bold",
          "size": "sm",
          "margin": "lg",
        }
      );
      //  歌のリンク
      var songURL = likedInfo.song.detail_url || likedInfo.song.sound.url;
      contents.push(
        {
          "type": "button",
          "style": "primary",
          "height": "sm",
          "margin": "xs",
          "action": {
            "type": "uri",
            "label": "曲を聞く🎵",
            "uri": songURL,
          }
        }
      )
      // プロフィール
      contents.push(
        {
          "type": "button",
          "style": "primary",
          "height": "sm",
          "margin": "md",
          "color": "#1da1f1",
          "action": {
            "type": "uri",
            "label": "プロフィールを見る!!",
            "uri": likedInfo.singer.twitter_url,
          }
        }
      )
    }

    replyMessage.push({
      "type": "flex",
      "altText": "this is a flex message",
      "contents": {
        "type": "bubble",
        "hero": {
          "type": "image",
          // TODO 石井からもらう画像にする
          "url": "https://s3-ap-northeast-1.amazonaws.com/tmp-imajo/IMG_0856.jpg",
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover",
          "action": {
            "type": "uri",
            "uri": "http://linecorp.com/"
          }
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": contents,
        }
      }
    });

  }).catch( err => {
    console.log(err);
    replyMessage.push({ 'type': 'text', 'text': "曲を取得することができませんでした。" });
  });

  return replyMessage;
}
