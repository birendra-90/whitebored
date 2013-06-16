'use strict';

angular.module('wb').service('$tape', [
  '$http',
  function($http) {
    this.save = function(label, event) {
      $http({
        method: "POST",
        url: "/api/tapes/save",
        data: {
          label: label,
          event: event
        }
      })
    }
  }
])
