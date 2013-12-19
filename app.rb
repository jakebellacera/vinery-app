require "sinatra"
require "json"
require "pygments"
require "./lib/vine"

get "/" do
  erb :index
end

get "/tagged" do
  redirect to('/'), 303
end

get %r{/tagged/(\w+)$} do |tag|
  params[:tag] = tag
  vine = Vine.new(ENV["VINE_USERNAME"], ENV["VINE_PASSWORD"])
  response = vine.tagged(tag)
  @json = Pygments.highlight(JSON.pretty_generate(response))
  @posts = response["data"]["records"]
  erb :tagged
end

get %r{/tagged/(\w+)\.json$} do |tag|
  content_type :json
  vine = Vine.new(ENV["VINE_USERNAME"], ENV["VINE_PASSWORD"])
  vine.tagged(tag).to_json
end
