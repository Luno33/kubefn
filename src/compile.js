const shell = require('shelljs')
const fs = require('fs')

module.exports = () => {
  const currentDir = shell.pwd().stdout

  if (!shell.test('-f', `${currentDir}/.kubefn/blueprint-fn-base/package.json`)) {
    console.log('Cannot find the blueprint package.json. Are you in the root folder of your project?')
    return;
  }

  if (!shell.test('-f', `${currentDir}/package.json`)) {
    console.log('Cannot find the package.json file. Are you in the root folder of your project?')
    return;
  }

  console.log(`Compiling the function...`)
  shell.cp('-R', `${currentDir}/src`, `${currentDir}/.kubefn/blueprint-fn-base/`)

  console.log(`Load blueprint package.json...`)
  const packageJsonBlueprint = require(`${currentDir}/.kubefn/blueprint-fn-base/package.json`)

  console.log(`Load kubefn.config.js config...`)
  const kubefnConfig = require(`${currentDir}/kubefn.config.js`)

  console.log(`Load project package.json...`)
  const packageJson = require(`${currentDir}/package.json`)

  console.log(`Override blueprint package.json configs with kubefn.config.js configs...`)
  packageJsonBlueprint.config = {
    ...packageJsonBlueprint.config,
    ...kubefnConfig.config
  }

  console.log(`Override project name...`)
  packageJsonBlueprint.name = packageJson.name

  console.log(`Write new blueprint package.json...`)
  fs.writeFileSync(`${currentDir}/.kubefn/blueprint-fn-base/package.json`, JSON.stringify(packageJsonBlueprint, null, 2))
}
