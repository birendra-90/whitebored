angular.module('wb').
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider.
      when('/new', { template: '', controller: 'CreateController'}).
      when('/:token', { controller: 'Whiteboard', templateUrl: '/views/nice'}).
      otherwise({redirectTo: '/new'});

  $locationProvider.html5Mode(true)
}]);
