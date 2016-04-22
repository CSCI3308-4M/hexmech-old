.PHONY: all
all: bootstrap.min.css bootstrap.min.css.map

bootstrap.min.css: ../../node_modules/bootstrap/dist/css/bootstrap.min.css
	cp $< $@

bootstrap.min.css.map: ../../node_modules/bootstrap/dist/css/bootstrap.min.css.map
	cp $< $@

clean:
	rm *.min.css*
