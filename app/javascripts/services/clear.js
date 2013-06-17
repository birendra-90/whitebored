'use strict';

angular.module('wb').service('$clear', [
  '$canvas', '$event',
  function($canvas, $event) {
    this.execute = function() {
      $canvas.clear()

      $event.publish({
        type: "clear",
        payload: {
          user_id: 66
        }
      })
    }

    $event.subscribe("clear", $canvas.clear)
  }
])
