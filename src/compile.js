const shell = require('shelljs');

module.exports = () => {
  console.log(`Compiling the function...`)
  const currentDir = shell.pwd().stdout
  shell.cp('-R', `${currentDir}/src`, `${currentDir}/.kubefn/blueprint-fn-base/`)
}
