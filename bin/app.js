#!/usr/bin/env node
const _ = require('lodash');
const yargs = require('yargs');


const options = require('../lib/options.js')

var commands = [];
const argv = yargs.argv;
var flag = argv._[0];
if(!options.loadJson()){
    console.log("File created, please run using add command");
}
else if(flag === undefined){
    options.run();
}
else if(flag === "a" || flag === "add"){
    console.log(options.addCommand(argv.title, argv.script));
    options.run()
}
else if(flag === "d" || flag === "delete"){
    options.deleteCommand();
}
else if(flag === "e" || flag === "edit"){
    options.editCommand();
}
