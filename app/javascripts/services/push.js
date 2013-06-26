'use strict';

angular.module('wb').service("$push", [
  function() {
    var pubnub = PUBNUB.init({
      publish_key   : 'pub-c-7eda3eac-43f5-456e-99c2-8a863e16cb49',
      subscribe_key : 'sub-c-fe4c2890-d5fb-11e2-b813-02ee2ddab7fe'
    });

    var callbacks = []
    var channel;

    this.switchChannel = function(newChannel) {
      if( channel ) {
        console.debug("Unsubscribing from " + channel)
        pubnub.unsubscribe({ channel: channel})
      }

      channel = newChannel;
      pubnub.subscribe({
        channel : channel,
        message : received,
        connect : established
      })
    }

    this.subscribe = function(callback) {
      callbacks.push(callback)
    }

    this.sendMessage = function(message) {
      console.debug("Sending Message to '"+ channel +"':")
      console.debug(message)

      pubnub.publish({
        channel: channel,
        message: message
      })
    }

    function received(message) {
      console.debug("Received message:")
      console.debug(message)
      callbacks.forEach(function(callback) {
        callback(message)
      })
    }

    function established() {
      console.debug("(Re-)established push server connection")
    }
  }
])
