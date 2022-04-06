#!/usr/bin/env node

const commandLineUsage = require('command-line-usage')
const commandLineArgs = require('command-line-args')
const boostrap = require('./bootstrap')
const compile = require('./compile')
const run = require('./run')

const optionDefinitions = [
  { name: 'verbose', alias: 'v', type: Boolean },
  { name: 'command', type: String, multiple: true, defaultOption: true },
  { name: 'timeout', alias: 't', type: Number }
]

const options = commandLineArgs(optionDefinitions)

const usage = commandLineUsage([
  {
    header: 'A typical app',
    content: 'Generates something {italic very} important. This is a rather long, but ultimately inconsequential description intended solely to demonstrate description appearance. '
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'help',
        description: 'Display this usage guide.',
        alias: 'h',
        type: Boolean
      },
      {
        name: 'command',
        description: 'The command to run',
        type: String,
        multiple: true,
        defaultOption: true,
        typeLabel: '{underline file} ...'
      },
      {
        name: 'timeout',
        description: 'Timeout value in ms.',
        alias: 't',
        type: Number,
        typeLabel: '{underline ms}'
      }
    ]
  },
  {
    content: 'Project home: {underline https://github.com/me/example}'
  }
])

const basePath = ''
const logicPath = ''

async function bootstrap() {
  console.log(options)
  if (!('command' in options)) {
    return;
  }
  if (options.command[0] === "bootstrap") {
    if (options.command.length < 2) {
      console.log('Specify a function name')
      return;
    }
    boostrap(options.command[1])
  }
  if (options.command[0] === "compile") {
    compile()
  }
  if (options.command[0] === "run") {
    run()
  }
}

bootstrap()




