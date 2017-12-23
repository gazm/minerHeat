CS=node_modules/coffee-script/bin/coffee

MVERSION=node_modules/mversion/bin/version
VERSION=`$(MVERSION) | sed -E 's/\* package.json: //g'`

ISTANBUL=node_modules/istanbul/lib/cli.js
MOCHA=node_modules/mocha/bin/mocha
_MOCHA=node_modules/mocha/bin/_mocha
COVERALLS=node_modules/coveralls/bin/coveralls.js


# General
setup:
	@npm link

watch:
	@$(CS) -bwmco lib src

build:
	@$(CS) -bmco lib src


# Spec
test.clean:
	@git clean -fdx test/specs/fixtures

test: build
	@$(MOCHA) --compilers coffee:coffee-script/register \
		--ui bdd \
		--reporter spec \
		--recursive \
		--timeout 10000 \
		test/specs

test.coverage: build
	@$(ISTANBUL) cover $(_MOCHA) -- \
		--compilers coffee:coffee-script/register \
		--ui bdd \
		--reporter spec \
		--recursive \
		--timeout 10000 \
		test/specs

test.coverage.preview: test.coverage
	@cd coverage/lcov-report && python -m SimpleHTTPServer 9090

test.coverage.coveralls: test.coverage
	@sed -i.bak \
		"s/^.*nest-api\/lib/SF:lib/g" \
		coverage/lcov.info

	@cat coverage/lcov.info | $(COVERALLS)


# Versioning
bump.minor:
	@$(MVERSION) minor

bump.major:
	@$(MVERSION) major

bump.patch:
	@$(MVERSION) patch


# NPM Registry
publish:
	git tag $(VERSION)
	git push origin $(VERSION)
	git push origin master
	npm publish

re-publish:
	git tag -d $(VERSION)
	git tag $(VERSION)
	git push origin :$(VERSION)
	git push origin $(VERSION)
	git push origin master -f
	npm publish -f



.PHONY: build