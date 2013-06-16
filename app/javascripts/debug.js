console.debug = function(text) {
  $("#debug").append(text)
  $("#debug").append("<br />")
}

jQuery(function($) {
  $("<div id='debug'></div>").css({
    "background-color": "black",
    "color": "green",
    "font-family": "Courier"
  }).appendTo("body")
})
