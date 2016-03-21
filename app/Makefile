ESLINT = ./node_modules/.bin/eslint

.PHONY: all
all: install javascripts

.PHONY: prepublish
prebublish: javascripts stylesheets lint

.PHONY: install
install:
	npm install

.PHONY: lint
lint:
	$(ESLINT) app.js
	$(ESLINT) routes/**
	$(ESLINT) models/**
	$(ESLINT) lib/**
	$(ESLINT) public/javascripts/*.js

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
