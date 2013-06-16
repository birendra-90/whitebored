require "bundler/setup"
require "sinatra/base"
require "sinatra/namespace"
require "yajl"
require "redis"

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

  get "*" do
    erb :whiteboard
  end
end
