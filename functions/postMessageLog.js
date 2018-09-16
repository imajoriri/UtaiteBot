const rp = require('request-promise');

exports.postMessageLog = function(event, serverIP){
  var options = {
    method: 'POST',
    uri: 'http://' + serverIP + "/api/v1/bot/message_log",
    form: {
      userId: event.events[0].source.userId,
      message: event.events[0].message.text
    },
  };

  rp(options)
  return this;

}
