BOOTSTRAP_THEME=cyborg

.PHONY: all
all: bootstrap.min.css

.PHONY: bootstrap.min.css
bootstrap.min.css:
	curl -O https://bootswatch.com/$(BOOTSTRAP_THEME)/bootstrap.min.css

clean:
	rm *.min.css*
