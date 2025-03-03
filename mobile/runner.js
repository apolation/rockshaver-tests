const cypress = require('cypress')
const tesults = require('cypress-tesults-reporter');

const TOKEN ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjBlZmM4NDdmLWEzY2MtNDI4My04YTE5LTFmYjgwYTY3MWYxZS0xNzQxMDQ1OTUwNDkwIiwiZXhwIjo0MTAyNDQ0ODAwMDAwLCJ2ZXIiOiIwIiwic2VzIjoiZDUwZGJlY2EtN2M4My00ZjNmLTk0ZmEtNjcyZDFmZjRiNjI4IiwidHlwZSI6InQifQ.L1JlTUZHPYsLw4Zef5be8mu1RgZNfgLCQJJDANlS6uc'

cypress.run({
  // specs to run here
  browser: 'chrome'
})
.then((results) => {
  const args = {
    target: TOKEN,
  }
  tesults.results(results, args);
})
.catch((err) => {
 console.error(err)
})