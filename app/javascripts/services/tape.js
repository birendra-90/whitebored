'use strict';

angular.module('wb').service('$tape', [
  '$http', '$canvas',
  function($http, $canvas) {
    this.save = function(label, event) {
      $http({
        method: "POST",
        url: "/api/tapes/save",
        data: {
          label: label,
          event: event
        }
      })
    }

    this.replay = function() {
      $http({
        method: "GET",
        url: "/api/tapes/poop"
      }).then(function(response) {
        var i = 0;
        $canvas.clear()

        response.data.forEach(function(message) {
          setTimeout(function() {
            $canvas.drawLine(JSON.parse(message).payload.points)
          }, i * 150)
          i++;
        })
      })
    }
  }
])
