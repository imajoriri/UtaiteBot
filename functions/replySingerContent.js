// singerとsongを指定してメッセージコンテンツを取得
// 必須: singer >> twitter_url, twitter_name
//       song   >> detail_url
// TODO >> メッセージの文を修正する
const { getTwitterImage } = require('./getTwitterImage.js');
const { isHTTPS } = require('./isHTTPS.js');

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

exports.replySingerContent = replySingerContent;
