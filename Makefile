BABEL = node_modules/.bin/babel

all: build README.md

build: dist README.md

dist: lib/types/index.json "lib/**/*"
	rm -rf dist/
	$(BABEL) lib -d dist/lib
	cp lib/types/index.json dist/lib/types/index.json

lib/types/index.json: docs/types.yaml
	yaml2json --pretty docs/types.yaml > lib/types/index.json

README.md: docs/types.yaml
	bin/readme
