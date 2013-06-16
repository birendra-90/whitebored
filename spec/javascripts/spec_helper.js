beforeEach(module('wb'))

beforeEach(inject(function($httpBackend) {
  window.$httpBackend = $httpBackend;

  $("<canvas></canvas>").appendTo("body")
}))
