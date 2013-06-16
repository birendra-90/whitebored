'use strict';

angular.module('wb').service('$canvas', [
  function() {
    var canvas = $("canvas")

    var self = this;
    self.element = canvas;
    self.context = canvas[0].getContext("2d")

    this.startLine = function(point) {
      offsetPoint(point)
      self.context.beginPath()
      self.context.moveTo(point.x, point.y)
    }

    this.drawSegment = function(point) {
      offsetPoint(point)
      self.context.lineTo(point.x, point.y)
      self.context.strokeStyle = "#000"
      self.context.stroke()
    }

    this.endLine = function() {
      self.context.closePath()
    }

    this.drawLine = function(points) {
      self.startLine(points[0], self.context)
      points.slice(1).forEach(function(point) {
        self.drawSegment(point, self.context)
      })
      self.endLine(self.context)
    }

    this.clear = function() {
      self.context.clearRect(0,0,canvas.width(), canvas.height())
    }

    function offsetPoint(point) {
      point.x -= canvas.offset().left
      point.y -= canvas.offset().top
    }
  }
])
