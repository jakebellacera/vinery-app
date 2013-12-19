require 'httparty'
require 'json'
require 'pp'

class Vine
  include HTTParty
  base_uri "https://api.vineapp.com"

  def initialize(username, password)
    login(username, password)
  end

  def tagged(tag, query = {})
    query = {
      page: 1,
      size: 20 
    }.merge!(query)

    get("/timelines/tags/#{tag}", query)
  end

  private

  def login(username, password)
    response = self.class.post("/users/authenticate", {
      body: {
        username: username,
        password: password
      }
    })

    body = JSON.parse(response.body)

    @auth = {
      user_id: body["data"]["userId"],
      key: body["data"]["key"]
    }
  end

  def get(url, query = {}, headers = {})
    headers.merge!({
      "User-Agent" => "com.vine.iphone/1.0.3 (unknown, iPhone OS 6.0.1, iPhone, Scale/2.000000)",
      "Accept-Language" => "en, sv, fr, de, ja, nl, it, es, pt, pt-PT, da, fi, nb, ko, zh-Hans, zh-Hant, ru, pl, tr, uk, ar, hr, cs, el, he, ro, sk, th, id, ms, en-GB, ca, hu, vi, en-us;q=0.8",
      "vine-session-id" => @auth[:key]
    })

    self.class.get(url, { query: query, headers: headers })
  end
end
