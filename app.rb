require "bundler/setup"
require "sinatra/base"
require "sinatra/namespace"
require "yajl"
require "redis"
require "sprockets"

class App < Sinatra::Base
  register Sinatra::Namespace

  if ENV["RACK_ENV"] == "development"
    redis = Redis.new
  else
    uri = URI.parse(ENV["REDISTOGO_URL"])
    redis = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password)
  end

  set :public_folder, 'app'
  set :views, 'app/views'

  namespace "/api" do
    post "/tapes/save" do
      json = Yajl::Parser.parse(request.body.read)
      redis.lpush(json["label"], Yajl::Encoder.encode(json["event"]))
      "Cool"
    end

    get "/tapes/:label" do
      events = redis.lrange(params[:label], 0, redis.llen(params[:label])).reverse do |event|
        Yajl::Parser.parse(event)
      end

      Yajl::Encoder.encode(events)
    end
  end

  get "/stylesheets/compile.css" do
    content_type "text/css"

    sprockets = Sprockets::Environment.new
    sprockets.append_path 'app/stylesheets'
    sprockets['application.css']
  end


  ["/","/new", "/spaces/*"].each do |route|
    get route do
      sprockets = Sprockets::Environment.new
      sprockets.append_path 'app/javascripts'
      @javascripts = sprockets['application.js'].dependencies.map(&:logical_path)

      erb :index
    end
  end
end
