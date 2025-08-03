# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-solidbase"
  spec.version       = "0.0.1"
  spec.authors       = ["Woojae, Park"]
  spec.email         = ["nikescar@gmail.com"]

  spec.summary       = "Port of the Read the Docs theme to Jekyll to use with GitHub Pages."
  spec.homepage      = "https://github.com/nikescar/jekyll-theme-solidbase"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|LICENSE|README)!i) }

  spec.add_runtime_dependency "jekyll", ">= 3.10.0", "< 5.0"

  spec.add_development_dependency "bundler", "~> 2.5.6"
  spec.add_development_dependency "rake", "~> 13.1.0"
  spec.add_development_dependency "github-pages", "~> 232"
  spec.add_development_dependency "jekyll-remote-theme", "~> 0.4.3"
end
