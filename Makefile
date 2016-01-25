BABEL = node_modules/.bin/babel
YAML = node_modules/.bin/yaml2json

all: build README.md

build: dist README.md

dist: lib/types/index.json lib/**/* package.json
	rm -rf dist/
	$(BABEL) lib -d dist/lib
	cp lib/types/index.json dist/lib/types/index.json

lib/types/index.json: docs/types.yaml
	$(YAML) --pretty docs/types.yaml > lib/types/index.json

README.md: docs/overview.md.hbs bin/readme docs/types.yaml lib/constants.json
	bin/readme

watch:
	watchman watch $(shell pwd)
	watchman -- trigger $(shell pwd) rebuild \
		'lib/**/*' \
		'docs/**/*' \
		'package.json' \
		-- make build
