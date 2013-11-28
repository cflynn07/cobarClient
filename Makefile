PATH := ./node_modules/.bin:${PATH}

.PHONY : init clean-docs clean build test dist publish

init:
	npm install

docs:
	docco src/*.coffee

clean-docs:
	rm -rf docs/

#clean: clean-docs:
#  rm -rf lib/ test/*.js

build:
	# compile coffee-script
	coffee -o ./build/ -c ./src/
	# compile jade templates to html
	mkdir -p ./build/views
	jade ./src/views --out ./build/views
  # Add 3rd party JS
	cp -R ./vendor ./build/vendor

build-watch:
	cp -R ./vendor ./build/vendor
	coffee -w -o ./build/ -c ./src/

build-clean:
	rm -rf ./build/*

test:
	nodeunit test/refix.js

dist: clean init docs build test

publish: dist
	npm publish
