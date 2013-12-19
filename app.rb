require "sinatra"
require "json"
require "./lib/vine"

get "/" do
  erb :index
end

get "/tagged" do
  redirect to('/'), 303
end

get %r{/tagged/(\w+)$} do |tag|
  params[:tag] = tag
  erb :tagged
end

get %r{/tagged/(\w+)\.json$} do |tag|
  vine = Vine.new(ENV["VINE_USERNAME"], ENV["VINE_PASSWORD"])
  content_type :json
  vine.tagged(tag).to_json
end
