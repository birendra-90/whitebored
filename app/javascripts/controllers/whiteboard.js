angular.module('wb').controller('Whiteboard', [
  '$line', '$tape', '$push', '$routeParams',
  function($line, $tape, $push, $routeParams) {
    $push.switchChannel($routeParams.label)

    $tape.find($routeParams.label)
    $tape.replay(0)
  }
])
