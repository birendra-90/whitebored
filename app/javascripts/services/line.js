'use strict';

angular.module('wb').service('$line', [
  '$push', '$canvas',
  function($push, $canvas) {
    this.points = []

    $push.subscribe(function(message) {
      $canvas.drawLine(message.payload.points)
    })

    var self = this;

    var active = false;

    this.mousedown = function(e) {
      e.preventDefault()
      track(points(e))
      active = true;
    }

    this.mouseup = function(e) {
      if( !self.points ) return console.log("Nope.");

      e.preventDefault()

      $canvas.drawLine(self.points)
      $push.sendMessage({
        type: "line",
        payload: {
          points: self.points,
          user_id: 66
        }
      })
      active = false;
      self.points = []
    }

    this.mousemove = function(e) {
      if( !active ) return;

      track(points(e))
    }

    function track(points) {
      self.points.push({ x: points.x, y: points.y })
    }

    function points(event) {
      return { x: event.pageX, y: event.pageY }
    }

    $canvas.element.mousedown(this.mousedown)
    $canvas.element.mouseup(this.mouseup)
    $canvas.element.mousemove(this.mousemove)
  }
])
