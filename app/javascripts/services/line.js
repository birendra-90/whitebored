'use strict';

angular.module('wb').service('$line', [
  '$event', '$canvas',
  function($event, $canvas) {
    this.points = []

    var self = this;
    var queue = []
    var active = false;
    var locked = false;

    var flush = function() {
      if( !active && queue.length ) {
        locked = true;
        queue.forEach(function(drawFunction) {
          drawFunction()
        })
        queue = []
        locked = false;
      }

      setTimeout(flush, 200)
    }
    flush()

    $event.subscribe("line", function(payload) {
      var payload = payload;
      queue.push(function() {
        $canvas.drawLine(payload.points)
      })
    })

    this.mousedown = function(e) {
      if( locked ) return;
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
      if( !active ) return;
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

        $event.publish({
          type: "line",
          payload: {
            points: packet,
            user_id: 66
          }
        })
      }
    }

    function track(points) {
      self.points.push({ x: points.x, y: points.y })
    }

    function points(event) {
      return { x: event.offsetX, y: event.offsetY }
    }

    $canvas.element.mousedown(this.mousedown)
    $canvas.element.mouseup(this.mouseup)
    $canvas.element.mousemove(this.mousemove)
  }
])
