BABEL = node_modules/.bin/babel
JSDOC = node_modules/.bin/jsdoc
YAML = node_modules/.bin/yaml2json

.PHONY: test

all: build README.md

build: dist docs README.md

dist: lib/types/index.json lib/**/* package.json
	rm -rf dist/
	$(BABEL) lib -d dist/lib
	cp lib/types/index.json dist/lib/types/index.json

docs: lib/**/* package.json README.md
	rm -rf docs
	$(JSDOC) lib/**/* -c .jsdocrc

lib/types/index.json: lib/types/index.yaml
	$(YAML) --pretty lib/types/index.yaml > lib/types/index.json

README.md: bin/templates/overview.md.hbs bin/readme lib/types/index.yaml lib/constants.json
	bin/readme

test:
	npm test

watch:
	watchman-make -p 'bin/templates/**/*' 'lib/**/*' package.json -t build \
		-p 'bin/templates/**/*' 'lib/**/*.js' 'lib/**/*.json' 'test/**/*' package.json -t test
