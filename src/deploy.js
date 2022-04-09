const shell = require('shelljs');
const chalk = require('chalk')
const fs = require('fs')

module.exports = () => {
  console.log(chalk.green('--- deploy ---'))
  console.log(`Deploying the function...`)
  const currentDir = shell.pwd().stdout
  shell.exec(`npm --prefix ${currentDir}/.kubefn/blueprint-fn-base/ run create-kubectl-config`)
  shell.exec(`npm --prefix ${currentDir}/.kubefn/blueprint-fn-base/ run deploy-kubectl-config`)

  console.log(`\nDeployed Kubernetes configuration:`)
  const kubernetesConfiguration = fs.readFileSync(`${currentDir}/.kubefn/blueprint-fn-base/devops/kubectl-config.yaml`, {encoding:'utf8', flag:'r'})
  console.log(chalk.green(kubernetesConfiguration))

  console.log(chalk.black.bgGreen('\n---> Remember to expose your function through your kubernetes ingress <---\n'))
}