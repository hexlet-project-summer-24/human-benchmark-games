install:
		npm ci
run:
		npx parcel src/index.html
build:
		npm run build
publish:
		npm publish --dry-run
test:
		npm test --passWithNoTests
test-coverage:
		npm test -- --coverage --coverageProvider=v8
lint:
		npx eslint --fix *.js
