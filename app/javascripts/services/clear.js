'use strict';

angular.module('wb').service('$clear', [
  '$canvas',
  function($canvas) {
    this.execute = function() {
      $canvas.clear()
    }
  }
])
