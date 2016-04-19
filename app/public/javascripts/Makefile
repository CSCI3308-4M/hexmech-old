BROWSERIFY = ../../node_modules/.bin/browserify

include Libs
SOURCES = $(wildcard *.js)
BUNDLES = $(addprefix bundles/, $(SOURCES))

RLIBS = $(addprefix -r , $(LIBS))
XLIBS = $(addprefix -x , $(LIBS))

.PHONY: all
all: bundles bundles/libs.js $(BUNDLES)

bundles:
	mkdir bundles

bundles/libs.js: Libs
	$(BROWSERIFY) $(RLIBS) -d -t [babelify --presets es2015] -p [minifyify --map /javascripts/$@.map  --output $@.map ] > $@

bundles/%.js: %.js Libs
	$(BROWSERIFY) $(XLIBS) $< -d -t [babelify --presets es2015] -p [minifyify --map /javascripts/$@.map  --output $@.map ] > $@

clean:
	rm -rf bundles
