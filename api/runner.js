const cypress = require('cypress')
const tesults = require('cypress-tesults-reporter');

const TOKEN ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjBlZmM4NDdmLWEzY2MtNDI4My04YTE5LTFmYjgwYTY3MWYxZS0xNzQxMDQ1NjY0MjMwIiwiZXhwIjo0MTAyNDQ0ODAwMDAwLCJ2ZXIiOiIwIiwic2VzIjoiOGM0YTYwYmItMGQ0NS00NWI3LTljYjEtYTIyNjAyN2U4N2M2IiwidHlwZSI6InQifQ.jEb_XYM7FAGcCjVA6f1aAXdaYkJuikO0J5UkhJAXunU'

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