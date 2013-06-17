'use strict';

angular.module('wb').service('$event', [
  '$push', '$tape',
  function($push, $tape) {
    this.publish = function(message) {
      $tape.save(message)

      // we stringify here to save space because pubnub has a max message size.
      $push.sendMessage({
        type: message.type,
        payload: JSON.stringify(message.payload)
      })
    }

    var eventHandlers = {}

    this.subscribe = function(type, callback) {
      eventHandlers[type] = eventHandlers[type] || []
      eventHandlers[type].push(callback)
    }

    $push.subscribe(function(message) {
      if( eventHandlers[message.type] && eventHandlers[message.type].length ) {
        // unstringify if it's coming from the push server
        if( typeof message.payload === "string" ) {
          message.payload = JSON.parse(message.payload)
        }
        eventHandlers[message.type].forEach(function(handler) {
          handler(message.payload)
        })
      }
    })
  }
])
