const compile = require('./compile')
const shell = require('shelljs');
const chalk = require('chalk')

module.exports = () => {
  console.log(chalk.green('--- run ---'))
  console.log(`Running the function...`)
  const currentDir = shell.pwd().stdout
  shell.exec(`npm --prefix ${currentDir}/.kubefn/blueprint-fn-base/ start `)
}