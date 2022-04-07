const compile = require('./compile')
const shell = require('shelljs');
const chalk = require('chalk')

module.exports = () => {
  console.log(chalk.green('--- deploy ---'))
  console.log(`Deploying the function...`)
  const currentDir = shell.pwd().stdout
  shell.exec(`npm --prefix ${currentDir}/.kubefn/blueprint-fn-base/ run create-kubectl-config`)
  shell.exec(`npm --prefix ${currentDir}/.kubefn/blueprint-fn-base/ run deploy-kubectl-config`)
  console.log(chalk.green('Remember to expose your function through your kubernetes ingress'))
}