angular.module('wb').controller('Whiteboard', [
  '$line', '$tape',
  function($line, $tape) {
    $tape.replay()
  }
])
