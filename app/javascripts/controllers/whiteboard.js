angular.module('wb').controller('Whiteboard', [
  '$line', '$tape', '$routeParams',
  function($line, $tape, $routeParams) {
    $tape.find($routeParams.label)
    $tape.replay()
  }
])
