#!/usr/bin/env node

const program = require('commander');
const { run } = require('./src/run.js');

program
  .version('0.0.0')
  .description('A command line tool to checkpoint your blockchain onto a public network.');

program
  .command('run <interval> <chainId>')
  .alias('r')
  .description('Run the checkpointer over an interval (in ms)')
  .action((interval, chainId) => {
    run(interval, chainId);
  });

program.parse(process.argv);
