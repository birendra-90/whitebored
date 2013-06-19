angular.module('wb').controller('Whiteboard', [
  '$tape', '$push', '$routeParams',
  function($tape, $push, $routeParams) {
    $push.switchChannel($routeParams.label)

    $tape.find($routeParams.label)
    $tape.replay(0)
  }
])
