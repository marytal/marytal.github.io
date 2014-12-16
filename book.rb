class Book

  @@count = 1

  def initialize(text)
    if text.class == File
      @text = text.read
    elsif text.class == String
      @text = text
    end

    @id = @@count
    @@count += 1
    @title = self.detect_title

  end

  def detect_title
    words = @text.split
    index_of_title = words.index("Title:")
    new_title = []

    p index_of_title

    while words[index_of_title] != "Author:"
      new_title.push(words[index_of_title])
      index_of_title += 1

    end

    _new_title = new_title * " "
    p _new_title

    return _new_title
  end

  def title=(title)
    @title = title
  end


  def title
    puts @title
  end

  def length
    @text.split.length

  end

  def page(page_number)
 
    start_value = (page_number - 1) * @page_length
    end_value = start_value + (@page_length - 1)
    @text[start_value..end_value]
  end

  def page_length=(length)
    @page_length = length
  end

  def instances_of_word(word)
    @text.split.count(word)
  end

  def most_common_words
    @most_common_words ||= Proc.new do 
      words = @text.split
      unique_words = words.uniq

      h = {}

      unique_words.each do |word|
        h[word] = 0
      end

      words.each do |word|
        h[word] += 1
      end

      _most_common_words = h.to_a.sort_by! {|a| a[1]}.reverse!.to_h.keys
    end.call
  end



  def most_common_word
    self.most_common_words.first
  end

  def replace_word_with(original, new_word)
    if original[0] >= 'a' && original[0] <= 'z'
      new_word[0] = new_word[0].downcase!
      @text.gsub! original, new_word
    else
      new_word[0] = new_word[0].capitalize!
      @text.gsub! original, new_word
    end
  end

  def number_of_chapters
    words = @text.split
    words.count("CHAPTER")/2
  end

  def no
    @id
  end

end