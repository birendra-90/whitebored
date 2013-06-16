angular.module('wb').controller('Toolbelt', [
  '$tape', '$scope', '$clear',
  function($tape, $scope, $clear) {
    $scope.replay = $tape.replay
    $scope.clear = $clear.execute
  }
])
