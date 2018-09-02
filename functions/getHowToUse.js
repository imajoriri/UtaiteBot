exports.getHowToUse = async function(event){
  var replyMessage = [];
  var msg = `このアプリはシンガーソングライターさんを知る「きっかけ」を提供しています。
Clovaと一緒にお楽しみください。（Clovaをお持ちでない方でも楽しめるようにしています）

Clovaに向かって「ボイスシンガーを開いて」と言ってみてください。
20秒程度の音楽をランダムで聞くことができます。
もし、その曲をいいなと思ったり、もっと聞きたいと思った場合Clovaに「いいね」と言ってみてください。
曲の詳細とシンガーさんをこちらのチャットでご紹介させていただきます。
`
  replyMessage.push({ 'type': 'text', 'text': msg });
  return replyMessage;
}
