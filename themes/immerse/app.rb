require 'rubygems' # Can't leave < 1.9.2 hanging...
require 'compass'
require 'sinatra'
require 'haml'

module Nesta
  class App
    configure do
      Compass.configuration do |config|
        config.project_path = File.dirname(__FILE__)
        config.sass_dir = 'views'
        config.environment = :development
        config.relative_assets = true
        config.http_path = "/"
      end
      set :haml, { :format => :html5 }
      set :sass, Compass.sass_engine_options
    end

    # Uncomment the Rack::Static line below if your theme has assets
    # (i.e images or JavaScript).
    #
    # Put your assets in themes/immerse/public/immerse.
    #
    use Rack::Static, :urls => ["/immerse"], :root => "themes/immerse/public"

    helpers do
      def article_titles(articles)
        haml(:titles, :layout => false, :locals => { :pages => articles })
      end
      def ellipse_if_long(text)
        text.split.length > 4 ? "#{text.split.first(4).join(' ')}&hellip;" : text
      end
      def format_date(date)
        date.strftime('%-d %b %y')
      end
      def body_class
        @page && @page.metadata('style')
      end
      def current_item?(item)
        request.path.match item.abspath
      end
    end

    # Add new routes here.
  end
end
