console.log("Scriptr\n");

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const options = require('./options.js')
const readline = require('readline');
var cmd = require('node-cmd')
var scripts = options.loadJson();
var commands = [];
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


console.log("----------------------------------");
for(var i = 0; i < scripts.commandName.length; i++){
    console.log("| "+"("+(i+1)+")"+". "+scripts.commandName[i]);
}

rl.question('Select an entry: ', (choice) => {
  commands = options.loadSelection(choice-1);
  console.log("executing commands: ");
  for(var i = 0; i < commands.length; i++){

      options.checkCd(commands[i]);
      cmd.get(
        commands[i],
        function(err, data, stderr){
            console.log(data);
        }
    );
  }
  rl.close();
});
