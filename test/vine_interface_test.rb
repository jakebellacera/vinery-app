require_relative "../lib/vine"
require "minitest/autorun"
require "pp"

class TestVine < Minitest::Test
  def setup
    @vine = Vine::API.new(ENV["VINE_USERNAME"], ENV["VINE_PASSWORD"])
    @results = @vine.tagged("funny")
  end

  def test_tag_fetching
    refute_nil @results # eh...
  end

  def test_collection_to_json
    first_result_thumbnail_url = @results[0].thumbnail_url
    results_json = @results.to_json
    assert_equal first_result_thumbnail_url, JSON.parse(results_json)[0]["thumbnailUrl"]
  end
end
