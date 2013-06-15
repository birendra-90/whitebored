$(function() {
  var bounds = $(window)

  var canvas = $("<canvas></canvas>")
  canvas.attr({width: bounds.width()})
  canvas.attr({height: bounds.height()})

  $("body").append(canvas)

  var context = canvas[0].getContext("2d");
  context.fillStyle="#7722ff";
  context.fillRect(0,0,10000,1);

  window.context = context;
  var points = {}

  canvas.mousedown(function(e) {
    e.preventDefault()
    points.start = {
      x: e.x,
      y: e.y
    }
  })

  canvas.mouseup(function(e) {
    context.beginPath()
    context.moveTo(points.start.x, points.start.y)
    context.lineTo(e.x, e.y)
    context.strokeStyle = "#000"
    context.stroke()
  })
})
