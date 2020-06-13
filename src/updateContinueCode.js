#!/usr/bin/env node

const Hashids = require('hashids/cjs')
const hashids = new Hashids('this is my salt', 60, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890')

const yaml = require('js-yaml');
const fs   = require('fs');


const argv = require('yargs')
    .usage('Usage: $0 -c [continueCode]')
    .demandOption(['c', 'i', 't'])
    .describe('c', 'continueCode from JuiceShop')
    .describe('i', 'Version of JuiceShop that continueCode is from. E.g. 8.7.2')
    .describe('t', 'Version of JuiceShop that you want a continueCode for. E.g. 11.0.1')
    .help('h')
    .alias('h', 'help')
    .epilog("Program for updating an old continueCode to different version of JuiceShop")
    .argv;

try {
  const challenges = yaml.safeLoad(fs.readFileSync(`./challenges/challenges_v${argv.i}.yml`, 'utf8'));
  const targetChallenges = yaml.safeLoad(fs.readFileSync(`./challenges/challenges_v${argv.t}.yml`, 'utf8'));
  const ids = hashids.decode(argv.c)
  let targetIds = []
  ids.forEach((id) => {
   const idInt = parseInt(id, 10)-1
   const challengeData = challenges[idInt];
   console.log("=======================================")
   console.log(`${id}: ${challengeData.name}`)
   let newId = targetChallenges.findIndex((targetChallenge) => {
     return targetChallenge.name === challengeData.name || targetChallenge.key === challengeData.key
   })
   if(newId === -1){
     console.log("Failed to Match")
   } else {
     targetIds.push(newId+1)
     if(targetChallenges[newId].name !== challengeData.name) {
       console.log(challengeData)
       console.log(`MATCHED: ${newId+1} ${targetChallenges[newId].name}`)
       console.log(targetChallenges[newId])
     } else {
       console.log(`MATCHED: ${newId+1} ${targetChallenges[newId].name}`)
     }
   }
  })
  targetIds.sort((a, b) => {
    return a - b;
  })
  const newContinueCode = hashids.encode(targetIds)
  console.log("==========================================")
  console.log("==========================================")
  console.log("NEW CONTINUE CODE")
  console.log(newContinueCode)
  console.log("==========================================")
  console.log("==========================================")
} catch (e) {
  console.log(e);
}
