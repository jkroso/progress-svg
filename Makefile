OPTIONS=

serve: node_modules
	@node_modules/serve/bin/serve -SLlojp 0

node_modules: *.json
	@packin install $(OPTIONS) \
		--meta deps.json,package.json,component.json \
		--folder node_modules

template.js: template.jade
	@echo "module.exports = '`jade < $<`'" > $@

.PHONY: serve test
