# Use the app.rb file to load Ruby code, modify or extend the models, or
# do whatever else you fancy when the theme is loaded.

module Nesta
  class App
    use Rack::Static, :urls => ['/favicon.png', '/favicon.ico', '/mni'], :root => 'themes/mni/public'

    helpers do
      def current_item?(item)
        request.path.match item.heading.downcase
      end
      def article_titles(articles)
        haml(:titles, :layout => false, :locals => { :pages => articles })
      end
    end

    get '/' do
      redirect_to_first_article
    end

    private
      def redirect_to_first_article
        redirect to Nesta::Page.find_articles.first.abspath
      end
  end
end
