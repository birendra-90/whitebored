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

    var self = this;
    self.context = canvas[0].getContext("2d")

    self.context.fillStyle="#7722ff";
    self.context.fillRect(0,0,10000,20);

    this.drawLine = function(points) {
      self.context.beginPath()
      self.context.moveTo(points[0].x, points[0].y)
      points.forEach(function(point) {
        self.context.lineTo(point.x, point.y)
      })
      self.context.strokeStyle = "#000"
      self.context.stroke()
      self.context.closePath()
    }

    this.element = canvas;
  }
])
