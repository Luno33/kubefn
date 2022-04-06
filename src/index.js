#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const boostrap = require('./bootstrap')
const compile = require('./compile')
const run = require('./run')

yargs(hideBin(process.argv))
  .usage('Usage: $0 <command> [options]')
  .command('bootstrap <name>', 'create the function with name [name]', (yargs) => {
    return yargs
      .positional('name', {
        describe: 'name of your function'
      })
  }, (argv) => {
    boostrap(argv.name)
  })
  .command('compile', 'copy your ./src folder in the blueprint under ./.kubefn', (yargs) => {
    return yargs
  }, () => {
    compile()
  })
  .command('run', 'run locally your code in an expressjs server', (yargs) => {
    return yargs
  }, () => {
    run()
  })
  .demandCommand()
  .parse()
