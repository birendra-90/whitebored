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

    this.startLine = function(point) {
      self.context.beginPath()
      self.context.moveTo(point.x, point.y)
    }

    this.drawSegment = function(point) {
      self.context.lineTo(point.x, point.y)
      self.context.strokeStyle = "#000"
      self.context.stroke()
    }

    this.endLine = function() {
      self.context.closePath()
    }

    this.drawLine = function(points) {
      self.startLine(points[0])
      points.slice(1).forEach(function(point) {
        self.drawSegment(point)
      })
      self.endLine()
    }

    this.element = canvas;
  }
])
