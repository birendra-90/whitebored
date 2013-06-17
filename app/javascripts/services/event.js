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

    // this.subscribe = function() {
    //   $push.subscribe(function(message) {
    //     queue.push(function() {
    //       $canvas.drawLine(JSON.parse(message.payload).points)
    //     })
    //   })
    // }
  }
])
