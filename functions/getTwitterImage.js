// twitterのIDより、twitterのトプ画を取得
exports.getTwitterImage = function getTwitterImage(twitterName){
//function getTwitterImage(twitterName){
  return new Promise( (resolve, reject) => {
    let https = require('https');
    var url = "https://twitter.com/" + twitterName + "/profile_image?size=original";
    https.get(url, (res) => {
      let body = '';
      res.setEncoding('utf8');

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', (res) => {
        const cheerio = require('cheerio')
        const $ = cheerio.load(body)
        var imageURL = $("a").attr("href");;
        resolve(imageURL);
      });
    }).on('error', (e) => {
      console.log(e); //エラー時
      reject('https://hogehoge');
    });
  });

}
