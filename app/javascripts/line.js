$(function() {
  var bounds = $(window)

  var $canvas = $("<canvas></canvas>")
  var canvas = $canvas[0]

  $canvas.attr({width: bounds.width()})
  $canvas.attr({height: bounds.height()})

  $("body").append($canvas)

  var context = $canvas[0].getContext("2d");
  context.fillStyle="#7722ff";
  context.fillRect(0,0,10000,20);

  window.context = context;
  var points = {}

  var isPhone = $(window).width() <= 640;

  // TODO: inject push dependency
  var drawLine = function(start, end) {
    context.beginPath()
    context.moveTo(start.x, start.y)
    context.lineTo(end.x, end.y)
    context.strokeStyle = "#000"
    context.stroke()
  }

  var publishLine = function(start, end) {
    window.sendMessage({
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

  window.subscribe(function(message) {
    drawLine(message.payload.start, message.payload.end)
  })

  if( !isPhone ) {
    $canvas.mousedown(function(e) {
      e.preventDefault()
      points.start = {
        x: e.pageX,
        y: e.pageY
      }
    })

    $canvas.mouseup(function(e) {
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

      drawLine(coordinates.start, coordinates.end)
      publishLine(coordinates.start, coordinates.end)
    })
  } else {
    canvas.addEventListener("touchstart", function(e) {
      e.preventDefault()
      points.start = {
        x: e.pageX,
        y: e.pageY
      }
    }, false)

    canvas.addEventListener("touchend", function(e) {
      var coordinates = {
        start: {
          x: points.start.x,
          y: points.start.y
        },
        end: {
          x: e.x,
          y: e.y
        }
      }

      drawLine(coordinates.start, coordinates.end)
      publishLine(coordinates.start, coordinates.end)
    }, false)
  }
})
