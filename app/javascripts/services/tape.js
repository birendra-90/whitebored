'use strict';

angular.module('wb').service('$tape', [
  '$http', '$canvas',
  function($http, $canvas) {
    var label;

    this.find = function(newLabel) {
      label = newLabel;
    }

    this.save = function(event) {
      if( !label ) throw "No label provided. Set one with $tape.find"

      $http({
        method: "POST",
        url: "/api/tapes/save",
        data: {
          label: label,
          event: event
        }
      })
    }

    this.replay = function(delay) {
      if( typeof delay === "undefined" ) delay = 150;
      if( !label ) throw "No label provided. Set one with $tape.find"

      $http({
        method: "GET",
        url: "/api/tapes/" + label
      }).then(function(response) {
        var i = 0;
        $canvas.clear()

        response.data.forEach(function(message) {
          setTimeout(function() {
            window.trigger(JSON.parse(message))
          }, i * delay)
          i++;
        })
      })
    }
  }
])
