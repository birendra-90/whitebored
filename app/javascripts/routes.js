angular.module('wb').config([
  '$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
        when('/new', { templateUrl: '/views/new.html', controller: 'CreateBoard'}).
        when('/spaces/:label', { controller: 'Whiteboard', templateUrl: '/views/whitespace.html'}).
        otherwise({redirectTo: '/new'});

    $locationProvider.html5Mode(true)
  }
]);
