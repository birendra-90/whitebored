'use strict';

angular.module('wb').service('$canvas', [
  function() {
    var canvas = $("canvas")

    if( !canvas.length ) {
      var bounds = $(window)

      canvas = $("<canvas></canvas>")
      canvas.attr({width: bounds.width()})
      canvas.attr({height: bounds.height()})

      $("body").append(canvas)
    }

    var context = canvas[0].getContext("2d")

    context.fillStyle="#7722ff";
    context.fillRect(0,0,10000,20);

    this.drawLine = function(start, end) {
      context.beginPath()
      context.moveTo(start.x, start.y)
      context.lineTo(end.x, end.y)
      context.strokeStyle = "#000"
      context.stroke()
    }

    this.element = canvas;
  }
])
