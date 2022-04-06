const shell = require('shelljs');
const compile = require('./compile')

module.exports = () => {
  compile()
  console.log(`Running the function...`)
  const currentDir = shell.pwd().stdout
  shell.exec(`npm --prefix ${currentDir}/.kubefn/blueprint-fn-base/ start `)
}