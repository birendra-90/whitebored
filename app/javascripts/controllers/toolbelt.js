angular.module('wb').controller('Toolbelt', [
  '$tape', '$scope',
  function($tape, $scope) {
    $scope.replay = $tape.replay
  }
])
