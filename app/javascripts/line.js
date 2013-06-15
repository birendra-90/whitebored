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

  if( !isPhone ) {
    $canvas.mousedown(function(e) {
      e.preventDefault()
      points.start = {
        x: e.x,
        y: e.y
      }
    })

    $canvas.mouseup(function(e) {
      context.beginPath()
      context.moveTo(points.start.x, points.start.y)
      context.lineTo(e.x, e.y)
      context.strokeStyle = "#000"
      context.stroke()
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
      context.beginPath()
      context.moveTo(points.start.x, points.start.y)
      context.lineTo(e.pageX, e.pageY)
      context.strokeStyle = "#000"
      context.stroke()
      alert("went from " + points.start.x + "," + points.start.y + " to " + e.pageX + "," + e.pageY)
    }, false)
  }
})
