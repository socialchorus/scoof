$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "scoof/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "scoof"
  s.version     = Scoof::VERSION
  s.authors     = ["Kane Baccigalupi", "Marc Balderama"]
  s.email       = ["developers@socialchorus.com"]
  s.homepage    = "http://github.com/socialchorus/scoof"
  s.summary     = "Scoof is a Backbone/OOCSS engine for your Rails 4 app"
  s.description = "Scoof is a Backbone/OOCSS engine for your Rails 4 app"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]

  s.add_dependency "rails", "~> 4.0.0"

  s.add_development_dependency 'pg'
  s.add_development_dependency 'rspec-rails'
  s.add_development_dependency 'cucumber-rails'
  s.add_development_dependency 'selenium-webdriver', '~> 2.30.0'
  s.add_development_dependency 'database_cleaner'
  s.add_development_dependency 'zip' # required by selenium-webdriver, but not bundled correctly
end
