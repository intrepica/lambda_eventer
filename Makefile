MAIN?=main
DEBUG?=node-*
DEBUG_TEST?=''
NODE_ENV?=development

test:
	@NODE_ENV=test DEBUG=$(DEBUG_TEST) ./node_modules/.bin/mocha test/*.js -R spec -t 30000

test-watch:
	@NODE_ENV=test DEBUG=$(DEBUG_TEST) ./node_modules/.bin/mocha test/*.js -R spec -w . -t 30000

test-html-coverage:
	NODE_ENV=test DEBUG=$(DEBUG_TEST) ./node_modules/.bin/istanbul cover ./node_modules/mocha/bin/_mocha test/*.js -x "**/spec_helpers/**" --report html -- -R spec -t 30000

debug-test:
	@NODE_ENV=test DEBUG=$(DEBUG) ./node_modules/.bin/mocha test/*.js -R spec -t 30000 --debug-brk

debug:
	@NODE_ENV=$(NODE_ENV) DEBUG=$(DEBUG) node --debug-brk index.js

start:
	@NODE_ENV=$(NODE_ENV) DEBUG=$(DEBUG) node index.js

console:
	@NODE_ENV=$(NODE_ENV) DEBUG=$(DEBUG) node repl/console.js

debug-console:
	@NODE_ENV=$(NODE_ENV) DEBUG=$(DEBUG) node --debug-brk repl/console.js
	
watch:
	@NODE_ENV=$(NODE_ENV)  DEBUG=$(DEBUG) ./node_modules/.bin/supervisor -w . index.js

.PHONY: test
