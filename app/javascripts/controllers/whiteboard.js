angular.module('wb').controller('Whiteboard', [
  '$line', '$http', '$canvas',
  function($line, $http, $canvas) {
    window.reload = function() {
      $http({
        method: "GET",
        url: "/api/tapes/poop"
      }).then(function(response) {
        var i = 0;
        response.data.forEach(function(message) {
          setTimeout(function() {
            $canvas.drawLine(JSON.parse(message).payload.points)
          }, i * 300)
          i++;
        })
      })
    }

    window.reload()
  }
])
