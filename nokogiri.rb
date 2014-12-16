
require 'nokogiri'
require 'httparty'



def getMovies
  starting_year = 1980
  ending_year = 2014

  year = 1980

  (ending_year - starting_year).times do 
    page_number = 1
    2.times do 

      resp = HTTParty.get("http://www.boxofficemojo.com/yearly/chart/?page=#{page_number}&view=releasedate&view2=domestic&yr=#{year}&p=.htm")
      noko = Nokogiri::HTML(resp.body)
      selector = "#body table:nth-child(5) tr td:nth-child(1) table tr:nth-child(2) td table tr"
        noko.css(selector).each do |row|
          num = row.css('td:nth-child(1) font')[0]
          next unless num
          next unless num.text.match(/\A\d+\Z/)

          title = row.css('td:nth-child(2) a')[0].text
          puts title
        end

      page_number += 1

    end

    year += 1

  end

end

def getBooks
  page = 1

  100.times do 

    resp = HTTParty.get("https://www.goodreads.com/list/show/1.Best_Books_Ever?page=#{page}")
    noko = Nokogiri::HTML(resp.body)
    selector = "body tr td:nth-child(3) > a > span"

    noko.css(selector).each do |span|
      title = span.text
      puts title
    end

    page += 1

  end

end



def getMoviesInTheaters
  resp = HTTParty.get("http://www.imdb.com/movies-in-theaters/")
  noko = Nokogiri::HTML(resp.body)
  selector = "body .overview-top h4 a"

  noko.css(selector).each do |movie_block|
    title = movie_block.text
    puts title
  end
end
