BABEL = node_modules/.bin/babel
YAML = node_modules/.bin/yaml2json

.PHONY: test

all: build README.md

build: dist README.md

dist: lib/types/index.json lib/**/* package.json
	rm -rf dist/
	$(BABEL) lib -d dist/lib
	cp lib/types/index.json dist/lib/types/index.json

lib/types/index.json: lib/types/index.yaml
	$(YAML) --pretty lib/types/index.yaml > lib/types/index.json

README.md: docs/overview.md.hbs bin/readme lib/types/index.yaml lib/constants.json
	bin/readme

test:
	npm test

watch:
	watchman-make -p 'docs/**/*' 'lib/**/*' package.json -t build \
		-p 'docs/**/*' 'lib/**/*.js' 'lib/**/*.json' 'test/**/*' package.json -t test
