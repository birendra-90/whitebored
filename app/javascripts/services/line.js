'use strict';

angular.module('wb').service('$line', [
  '$push', '$canvas',
  function($push, $canvas) {
    var points = {}

    $push.subscribe(function(message) {
      $canvas.drawLine(message.payload.start, message.payload.end)
    })

    var self = this;

    this.mousedown = function(e) {
      e.preventDefault()
      points.start = {
        x: e.pageX,
        y: e.pageY
      }
    }

    this.mouseup = function(e) {
      e.preventDefault()

      var coordinates = {
        start: {
          x: points.start.x,
          y: points.start.y
        },
        end: {
          x: e.pageX,
          y: e.pageY
        }
      }

      $canvas.drawLine(coordinates.start, coordinates.end)
      self.publishLine(coordinates.start, coordinates.end)
    }

    this.publishLine = function(start, end) {
      $push.sendMessage({
        type: "line",
        payload: {
          start: {
            x: start.x,
            y: start.y
          },
          end: {
            x: end.x,
            y: end.y
          },
          user: {
            id: 66
          }
        }
      })
    }

    $canvas.element.mousedown(this.mousedown)
    $canvas.element.mouseup(this.mouseup)
  }
])
