'use strict';

angular.module('wb').service('$line', [
  '$push', '$canvas',
  function($push, $canvas) {
    this.points = []

    var self = this;
    var queue = []
    var active = false;

    $push.subscribe(function(message) {
      queue.push(function() {
        $canvas.drawLine(JSON.parse(message.payload).points)
      })
    })

    var flush = function() {
      if( !active ) {
        queue.forEach(function(drawFunction) {
          drawFunction()
        })
      }

      setTimeout(flush, 200)
    }
    flush()

    this.mousedown = function(e) {
      e.preventDefault()
      $canvas.startLine(points(e))
      active = true;
      track(points(e))
    }

    this.mousemove = function(e) {
      if( !active ) return;
      $canvas.drawSegment(points(e))
      track(points(e))
    }

    this.mouseup = function(e) {
      if( !self.points ) return console.log("Nope.");

      e.preventDefault()

      self.pushPoints()
      $canvas.endLine()
      active = false;
      self.points = []
    }

    this.pushPoints = function() {
      for( var i = 0; i < self.points.length; i+= 100 ) {
        var packet = self.points.slice(i, i+100)
        $push.sendMessage({
          type: "line",
          payload: JSON.stringify({
            points: packet,
            user_id: 66
          })
        })
      }
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
