(function(){
  var pubnub = PUBNUB.init({
      publish_key   : 'pub-c-7eda3eac-43f5-456e-99c2-8a863e16cb49',
      subscribe_key : 'sub-c-fe4c2890-d5fb-11e2-b813-02ee2ddab7fe'
  });

  pubnub.subscribe({
    channel : "whiteboard",
    message : received,
    connect : established
  })

  var callbacks = []

  function received(message) {
    console.log("Received message:")
    console.log(message)
    callbacks.forEach(function(callback) {
      callback(message)
    })
  }

  function established() {
    console.log("Established push server connection")
  }

  window.subscribe = function(callback) {
    callbacks.push(callback)
  }

  window.sendMessage = function(message, channel) {
    channel = channel || "whiteboard"
    console.log("Sending Message:")
    console.log(message)

    pubnub.publish({
      channel: channel,
      message: message
    })
  }
})();
