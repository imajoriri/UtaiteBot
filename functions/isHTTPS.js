// https」から始まるかを検証
exports.isHTTPS = (url) => {
//function isHTTPS(url){
  if(url.indexOf('https') != -1){
    return url;
  }else{
    return "https://hogehoge"
  }
}


