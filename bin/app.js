#!/usr/bin/env node
const yargs = require('yargs');
var program = require('commander');

const options = require('../lib/options.js')

var commands = [];
const flagCheck = yargs.argv._[0];
program.version('0.0.1');
program.option('-a, --add', 'Add a new Script');
program.option('-d, --delete', 'Delete an existing Script');
program.option('-e, --edit', 'Edit an existing Script');
program.parse(process.argv);

if(!options.loadJson()){
    console.log("Setting up...\n")
    options.addCommand();
}
else if(program.add){
    options.addCommand();
    options.run()
}
else if(program.delete){
    options.deleteCommand();
}
else if(program.edit){
    options.editCommand();
}
else if(flagCheck === undefined){
    console.log("run")
    options.run();
}
else
	options.runCommand(flagCheck);
