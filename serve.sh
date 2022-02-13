#!/bin/bash

docker run --rm --volume="$PWD:/srv/jekyll" --volume="$PWD/vendor/bundle:/usr/local/bundle" -p 3000:4000 -it jekyll/jekyll jekyll serve --watch --incremental --drafts