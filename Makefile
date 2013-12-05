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

build: clean
	# compile coffee-script
	coffee -o ./build/ -c ./src/
	# compile jade templates to html
	mkdir -p ./build/views
	jade ./src/views --out ./build/views
	# Add 3rd party JS
	rm -rf ./build/vendor/
	cp -r ./vendor ./build/vendor
	# Copy CSS to build
	cp -r ./assets ./build/assets

build-watch:
	cp -r ./vendor ./build/vendor
	coffee -w -o ./build/ -c ./src/ >> coffee-script.log &
	jade ./src/views --out ./build/views >> jade.log &

clean:
	rm -rf ./build/*

test:
	nodeunit test/refix.js

dist: clean init docs build test

publish: dist
	npm publish
