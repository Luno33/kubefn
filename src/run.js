const compile = require('./compile')
const shell = require('shelljs');
const chalk = require('chalk')

module.exports = () => {
  compile()
  console.log(chalk.green('--- bootstrap ---'))
  console.log(`Running the function...`)
  const currentDir = shell.pwd().stdout
  shell.exec(`npm --prefix ${currentDir}/.kubefn/blueprint-fn-base/ start `)
}