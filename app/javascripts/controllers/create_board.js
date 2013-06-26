'use strict';

angular.module('wb').controller('CreateBoard', [
  '$scope', '$location',
  function($scope, $location) {
    $scope.create = function() {
      $location.path($scope.name);
    }
  }
])
