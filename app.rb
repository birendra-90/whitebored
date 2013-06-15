require "bundler/setup"
require "sinatra/base"

class App < Sinatra::Base
  set :public_folder, 'app'
  set :views, 'app'

  get "/" do
    <<-html
    <style type="text/css">body {padding: 0; margin: 0; cursor: pointer;} </style>
    <script src="//cdnjs.cloudflare.com/ajax/libs/zepto/1.0/zepto.min.js"></script>
    <script src="/javascripts/line.js"></script>
    html
  end
end
