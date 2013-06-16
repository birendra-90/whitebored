require "bundler/setup"
require "sinatra/base"

class App < Sinatra::Base
  set :public_folder, 'app'
  set :views, 'app'

  get "*" do
    <<-HTML
    <html ng-app="wb">
    <head>
      <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">
      <link rel="stylesheet" href="/stylesheets/board.css" />
    </head>
    <body ng-controller="Whiteboard">
      <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
      <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
      <script src="http://cdn.pubnub.com/pubnub-3.5.1.min.js"></script>
      <script src="/javascripts/vendor/hammer.js"></script>
      <script src="/javascripts/debug.js"></script>
      <script src="/javascripts/module.js"></script>
      <script src="/javascripts/routes.js"></script>
      <script src="/javascripts/services/push.js"></script>
      <script src="/javascripts/services/line.js"></script>
      <script src="/javascripts/services/canvas.js"></script>
      <script src="/javascripts/controllers/whiteboard.js"></script>
      <script src="/javascripts/boot.js"></script>
    </body>
    </html>
    HTML
  end
end
