# build process

this is built log with github pages deploy with jekyll theme.
https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll


```log
Run actions/jekyll-build-pages@v1
  with:
    source: .
    destination: ./_site
    future: false
    build_revision: f3dccabb943764dbc280cd11f071f2bb86b04572
    verbose: true
    token: ***
/usr/bin/docker run --name ghcrioactionsjekyllbuildpagesv1013_914d37 --label 0e64bd --workdir /github/workspace --rm -e "INPUT_SOURCE" -e "INPUT_DESTINATION" -e "INPUT_FUTURE" -e "INPUT_BUILD_REVISION" -e "INPUT_VERBOSE" -e "INPUT_TOKEN" -e "HOME" -e "GITHUB_JOB" -e "GITHUB_REF" -e "GITHUB_SHA" -e "GITHUB_REPOSITORY" -e "GITHUB_REPOSITORY_OWNER" -e "GITHUB_REPOSITORY_OWNER_ID" -e "GITHUB_RUN_ID" -e "GITHUB_RUN_NUMBER" -e "GITHUB_RETENTION_DAYS" -e "GITHUB_RUN_ATTEMPT" -e "GITHUB_ACTOR_ID" -e "GITHUB_ACTOR" -e "GITHUB_WORKFLOW" -e "GITHUB_HEAD_REF" -e "GITHUB_BASE_REF" -e "GITHUB_EVENT_NAME" -e "GITHUB_SERVER_URL" -e "GITHUB_API_URL" -e "GITHUB_GRAPHQL_URL" -e "GITHUB_REF_NAME" -e "GITHUB_REF_PROTECTED" -e "GITHUB_REF_TYPE" -e "GITHUB_WORKFLOW_REF" -e "GITHUB_WORKFLOW_SHA" -e "GITHUB_REPOSITORY_ID" -e "GITHUB_TRIGGERING_ACTOR" -e "GITHUB_WORKSPACE" -e "GITHUB_ACTION" -e "GITHUB_EVENT_PATH" -e "GITHUB_ACTION_REPOSITORY" -e "GITHUB_ACTION_REF" -e "GITHUB_PATH" -e "GITHUB_ENV" -e "GITHUB_STEP_SUMMARY" -e "GITHUB_STATE" -e "GITHUB_OUTPUT" -e "RUNNER_OS" -e "RUNNER_ARCH" -e "RUNNER_NAME" -e "RUNNER_ENVIRONMENT" -e "RUNNER_TOOL_CACHE" -e "RUNNER_TEMP" -e "RUNNER_WORKSPACE" -e "ACTIONS_RUNTIME_URL" -e "ACTIONS_RUNTIME_TOKEN" -e "ACTIONS_CACHE_URL" -e "ACTIONS_ID_TOKEN_REQUEST_URL" -e "ACTIONS_ID_TOKEN_REQUEST_TOKEN" -e "ACTIONS_RESULTS_URL" -e GITHUB_ACTIONS=true -e CI=true -v "/var/run/docker.sock":"/var/run/docker.sock" -v "/home/runner/work/_temp/_github_home":"/github/home" -v "/home/runner/work/_temp/_github_workflow":"/github/workflow" -v "/home/runner/work/_temp/_runner_file_commands":"/github/file_commands" -v "/home/runner/work/nikescar.github.io/nikescar.github.io":"/github/workspace" ghcr.io/actions/jekyll-build-pages:v1.0.13
To use retry middleware with Faraday v2.0+, install `faraday-retry` gem
  Logging at level: debug
Configuration file: /github/workspace/./_config.yml
      GitHub Pages: github-pages v232
      GitHub Pages: jekyll v3.10.0
             Theme: jekyll-theme-primer
      Theme source: /usr/local/bundle/gems/jekyll-theme-primer-0.6.0
         Requiring: jekyll-github-metadata
         Requiring: jekyll-seo-tag
         Requiring: jekyll-remote-theme
         Requiring: jekyll-coffeescript
         Requiring: jekyll-commonmark-ghpages
         Requiring: jekyll-gist
         Requiring: jekyll-github-metadata
         Requiring: jekyll-paginate
         Requiring: jekyll-relative-links
         Requiring: jekyll-optional-front-matter
         Requiring: jekyll-readme-index
         Requiring: jekyll-default-layout
         Requiring: jekyll-titles-from-headings
         Requiring: jekyll-remote-theme
   GitHub Metadata: Initializing...
            Source: /github/workspace/.
       Destination: /github/workspace/./_site
 Incremental build: disabled. Enable with --incremental
      Generating... 
             Theme: https://github.com/nikescar/jekyll-theme-rtd
      Theme source: /tmp/jekyll-remote-theme-20250605-7-dnrx4p
      Remote Theme: Using theme nikescar/jekyll-theme-rtd
      Remote Theme: Downloading https://codeload.github.com/nikescar/jekyll-theme-rtd/zip/HEAD to /tmp/jekyll-remote-theme-20250605-7-j2w451.zip
      Remote Theme: Unzipping /tmp/jekyll-remote-theme-20250605-7-j2w451.zip to /tmp/jekyll-remote-theme-20250605-7-dnrx4p
        Generating: JekyllOptionalFrontMatter::Generator finished in 0.000142725 seconds.
        Generating: JekyllReadmeIndex::Generator finished in 0.000172423 seconds.
        Generating: Jekyll::Paginate::Pagination finished in 6.733e-06 seconds.
        Generating: JekyllRelativeLinks::Generator finished in 2.8585e-05 seconds.
        Generating: JekyllDefaultLayout::Generator finished in 0.001158755 seconds.
         Requiring: kramdown-parser-gfm
        Generating: JekyllTitlesFromHeadings::Generator finished in 0.009825506 seconds.
         Rendering: README.md
  Pre-Render Hooks: README.md
  Rendering Markup: README.md
  Rendering Layout: README.md
     Layout source: theme
   GitHub Metadata: Generating for nikescar/nikescar.github.io
   GitHub Metadata: Calling @client.pages("nikescar/nikescar.github.io", {})
           Writing: /github/workspace/_site/index.html
                    done in 0.789 seconds.
 Auto-regeneration: disabled. Use --watch to enable.
      Remote Theme: Cleaning up /tmp/jekyll-remote-theme-20250605-7-dnrx4p
```






