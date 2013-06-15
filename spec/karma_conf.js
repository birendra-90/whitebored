basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'spec/lib/faye.js',
  'http://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js',
  'http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js',
  'http://cdn.pubnub.com/pubnub-3.5.1.min.js',
  'app/javascripts/*/**/*.js',
  'spec/lib/angular/angular-mocks.js',
  'spec/javascripts/spec_helper.js',
  'spec/javascripts/**/*.js'
];

exclude = []

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
