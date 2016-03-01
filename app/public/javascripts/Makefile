BROWSERIFY = ../../node_modules/.bin/browserify

LIBS    = jquery bootstrap jquery-validation path
SOURCES = $(wildcard *.js)
BUNDLES = $(addprefix bundles/, $(SOURCES))

RLIBS = $(addprefix -r , $(LIBS))
XLIBS = $(addprefix -x , $(LIBS))

.PHONY: all
all: bundles bundles/libs.js $(BUNDLES)

bundles:
	mkdir bundles

bundles/libs.js:
	$(BROWSERIFY) $(RLIBS) -d -p [minifyify --no-map] > $@

bundles/%.js: %.js
	$(BROWSERIFY) -t cssify $(XLIBS) $< -d -p [minifyify --no-map] > $@

clean:
	rm -rf bundles
