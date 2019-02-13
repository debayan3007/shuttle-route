const fs = require('fs')
const solution = require('./solution')
const demoInput = require('./demoInput.json')
const argv = require('yargs').argv

const filename = argv._[0]
let input
if (filename) {
  try {
    input = require(`./${filename}`)
  } catch (e) {
    console.log('invalid filename, working with demoInput.json')
    input = demoInput
  }
}

const response = solution (input)

// console.log(JSON.stringify(response, null, 2))

fs.writeFile('./result.json', JSON.stringify(response, null, 2), 'utf8', (err) => {
  if (err) {
    console.log('error writing result file')
  }
  console.log('result is saved to result.json')
})