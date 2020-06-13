#!/usr/bin/env node

const Hashids = require('hashids/cjs')
const hashids = new Hashids('this is my salt', 60, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890')

const argv = require('yargs')
    .usage('Usage: $0 -c [continueCode]')
    .demandOption(['c'])
    .describe('c', 'continueCode from JuiceShop')
    .help('h')
    .alias('h', 'help')
    .epilog("Program for showing the challenge ids you have completed")
    .argv;

let ids = hashids.decode(argv.c)
console.log(ids)
