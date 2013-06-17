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
        var messages = response.data.map(function(message) {
          return JSON.parse(message);
        });

        $canvas.clear()

        if( delay == 0 ) {
          for( var i = messages.length-1; i > 0; i-- ) {
            if( messages[i].type == "clear") {
              messages = messages.slice(i)
              break;
            }
          }
        }

        var i = 0;
        messages.forEach(function(message) {
          setTimeout(function() {
            window.trigger(message)
          }, i * delay)
          i++;
        })
      })
    }
  }
])
