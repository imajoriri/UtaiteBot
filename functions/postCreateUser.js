const rp = require('request-promise');

exports.postCreateUser = async function(event){
  var options = {
    method: 'POST',
    uri: 'http://' + process.env["serverIP"] + "/api/v1/bot/create_user",
    form: {
      userId: event.events[0].source.userId,
    },
  };

  await rp(options)
  return this;

}
