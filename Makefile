BABEL = node_modules/.bin/babel
JSDOC = node_modules/.bin/jsdoc
YAML = node_modules/.bin/yaml2json
BROWSERIFY = node_modules/.bin/browserify

.PHONY: test

all: build README.md

build: dist dist/canvas-native.js docs README.md

dist: lib/types/meta.json lib/**/* package.json
	rm -rf dist/
	$(BABEL) lib -d dist/lib
	cp lib/types/meta.json dist/lib/types/meta.json

dist/canvas-native.js: dist
	$(BROWSERIFY) lib/index.js -t babelify -o dist/canvas-native.js --standalone CanvasNative

docs: lib/**/* package.json README.md
	rm -rf docs
	$(JSDOC) lib/**/* -c .jsdocrc

lib/types/meta.json: lib/types/meta.yaml
	$(YAML) --pretty lib/types/meta.yaml > lib/types/meta.json

README.md: bin/templates/overview.md.hbs bin/readme lib/types/meta.yaml lib/constants.json
	bin/readme

test:
	npm test

watch:
	watchman-make -p 'bin/templates/**/*' 'lib/**/*' package.json -t build \
		-p 'bin/templates/**/*' 'lib/**/*.js' 'lib/**/*.json' 'test/**/*' package.json -t test
