.PHONY: all
all: install javascripts

.PHONY: install
install:
	npm install

.PHONY: stylesheets
stylesheets:
	$(MAKE) -C public/stylesheets

.PHONY: javascripts
javascripts:
	$(MAKE) -C public/javascripts

.PHONY: clean
clean:
	rm -rf node_modules
	$(MAKE) -C public/javascripts clean
