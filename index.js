#!/usr/bin/env node

const program = require('commander');
// Require logic.js file and extract controller functions using JS destructuring assignment
// const { addContact, getContact } = require('./logic');

program
  .version('0.0.0')
  .description('A command line tool to checkpoint your blockchain onto a public network.');

program
  .command('run <interval>')
  .alias('r')
  .description('Run the checkpointer over an interval (in ms)')
  .action((interval) => {
    // addContact({firstname, lastname, phone, email});
    console.log('Running over interval', interval)
  });

program.parse(process.argv);
