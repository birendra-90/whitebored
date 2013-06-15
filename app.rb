require "bundler/setup"
require "sinatra/base"

class App < Sinatra::Base
  set :public_folder, 'app'
  set :views, 'app'

  get "/" do
    <<-html
    <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">
    <style type="text/css">body {padding: 0; margin: 0; cursor: pointer;} </style>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
    <script src="http://cdn.pubnub.com/pubnub-3.5.1.min.js"></script>
    <script src="/javascripts/hammer.js"></script>
    <script src="/javascripts/push.js"></script>
    <script src="/javascripts/line.js"></script>
    <script>
      console.debug = function(text) {
        $("#debug").append(text)
        $("#debug").append("<br />")
      }
    </script>
    <p id="debug" style="background-color:black; color:green; font-family: Helvetica"></p>
    html
  end
end
