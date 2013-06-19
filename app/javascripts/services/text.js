'use strict';

angular.module('wb').service('$text', [
  '$event', '$canvas',
  function($event, $canvas) {
    var self = this;
    var queue = [],
        active = false,
        locked = false,
        string = '',
        input = $("<input type='text'/>"),
        start  = {};

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

    $event.subscribe("text", function(payload) {
      var payload = payload;
      queue.push(function() {
        $canvas.drawText(payload.string, payload.start)
      })
    })

    this.keyup = function(e) {
      if( !active ) return;

      var code = e.keyCode || e.which;

      if( code == 13 ) {
        $event.publish({
          type: "text",
          payload: {
            string: input.val(),
            start: start
          }
        })

        $canvas.drawText(input.val(), start)

        removeInput()
        active = false
      } else if( code == 27) {
        removeInput()
      }
    }

    this.mouseup = function(e) {
      e.preventDefault()

      if( locked ) return;
      if( active ) {
        input.remove()
      }

      start = { x: e.offsetX, y: e.offsetY }
      active = true;
      displayInput(start)
    }

    this.activate = function() {
      $canvas.element.on("mouseup.text", this.mouseup)
      $canvas.cursor("text")
    }

    this.deactivate = function() {
      $canvas.element.off("mouseup.text")
      removeInput()
    }

    function displayInput(point) {
      input.appendTo($canvas.element.parent())
      input.on("keyup.text", self.keyup)
      input.css({
        left: point.x - 10,
        top: point.y - input.outerHeight()/2,
        width: $canvas.element.width() - point.x
      })
      input.select()
    }

    function removeInput() {
      input.off("keyup.text")
      input.val('')
      input.remove()
    }
  }
])
