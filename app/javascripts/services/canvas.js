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

    this.startLine = function(point, context) {
      context = context || self.context
      context.beginPath()
      context.moveTo(point.x, point.y)
    }

    this.drawSegment = function(point, context) {
      context = context || self.context
      context.lineTo(point.x, point.y)
      context.strokeStyle = "#000"
      context.stroke()
    }

    this.endLine = function(context) {
      context = context || self.context
      context.closePath()
    }

    this.drawLine = function(points) {
      var context = canvas[0].getContext("2d")
      self.startLine(points[0], context)
      points.slice(1).forEach(function(point) {
        self.drawSegment(point, context)
      })
      self.endLine(context)
    }

    this.element = canvas;
  }
])
