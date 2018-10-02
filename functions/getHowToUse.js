exports.getHowToUse = async function(event){
  var replyMessage = [];
  //  var msg = `このアプリはシンガーソングライターさんを知る「きっかけ」を提供します。
  //Clovaと一緒にお楽しみください。（Clovaをお持ちでない方でも楽しめるようにしています）
  //
  //Clovaに向かって「ボイスシンガーを開いて」と言ってみてください。
  //20秒程度の音楽をランダムで聞くことができます。
  //もし、その曲をいいなと思ったり、もっと聞きたいと思った場合Clovaに「いいね」と言ってみてください。
  //曲の詳細とシンガーさんをこちらのチャットでご紹介させていただきます。
  //`
  //  replyMessage.push({ 'type': 'text', 'text': msg });
  replyMessage.push({
    "type": "text",
    "text": `ボイスシンガーではシンガーソングライターとの出会いの「きっかけ」を提供します。Clovaスキル版ボイスシンガーと一緒にお楽しみください。`
  })
  replyMessage.push({
    "type": "text",
    "text": `Clovaに向かって「Clova、ボイスシンガーを開いて」と話しかけて見てください。素敵な出会いが待っていますよ。以下の動画で使い方がわかります!`
  })
  replyMessage.push({
    "type": "text",
    "text": "https://www.youtube.com/watch?v=Gf29xkk8m_k"
  })

  return replyMessage;
}
