// singerとsongを指定してメッセージコンテンツを取得
// 必須: singer >> twitter_url, twitter_name
//       song   >> detail_url
const { getTwitterImage } = require('./getTwitterImage.js');
const { isHTTPS } = require('./isHTTPS.js');

async function replySingerContent(singer, song){
  var twitterURL = singer.twitter_url || "https://hogehgoe";
  var imageURL = await getTwitterImage(singer.twitter_name) || "https://hogehgoe";

  var message = {
    type: "template",
    altText: `${song.name}`,
    template: {
      type: "buttons",
      actions: [
        {
          type: "uri",
          label: `プロフィールを見る!!`,
          uri: isHTTPS(twitterURL),
        }, ], thumbnailImageUrl: isHTTPS(imageURL), title: `${song.name}`,
      text: `${singer.name}さんの曲です。`
    }
  }

  if(song.detail_url){
    // 曲の詳細があったらボタンとして追加
    message.template.actions.push({
      type: "uri",
      label: `曲を聞いてみる`,
      uri: isHTTPS(song.detail_url),
    })
  }else{
    // 曲の詳細がなかったらS3を指定
    message.template.actions.push({
      type: "uri",
      label: `曲を聞いてみる`,
      uri: isHTTPS(song.sound.url),
    })
  }

  return message;
}

exports.replySingerContent = replySingerContent;
