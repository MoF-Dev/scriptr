const fs = require('fs');
const readline = require('readline');
var cmd = require('node-cmd');

var createJson = () => {
    try{
        fs.writeFileSync('Scriptr.json', '{"commandName":[], "commandCode":[]}');
        return loadJson();
    }
    catch(e){
        return e
    }
}

var loadJson = () => {
  try{
    var json = fs.readFileSync('Scriptr.json');
    return JSON.parse(json);
  }
  catch(e){
    return createJson();
  }
};

var loadSelection = (choice) => {
    var json = loadJson();
    return json.commandCode[choice];
}

var parseScript= (script) => {
    return script.split(";");
}

var addCommand = (title, script) => {
    var json = loadJson();
    json.commandName.push(title);
    json.commandCode.push(parseScript(script));
    saveJson(json);
    return "Successfully Added Command\n"
}

var saveJson = (json) => {
    console.log(json);
    fs.writeFileSync('Scriptr.json', JSON.stringify(json));
}

var run = () => {
    showMenu();
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Select an entry: ', (choice) => {
      commands = loadSelection(choice-1);
      for(var i = 0; i < commands.length; i++){
        //   options.checkCd(commands[i]);
          cmd.get(
            commands[i],
            function(err, data, stderr){
                console.log(data);
            }
        );
      }
      rl.close();
    });
}

var deleteCommand = (name) => {
    showMenu();
    var scripts = loadJson();
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Select an entry to delete: ', (choice) => {
        scripts.commandName.splice(choice-1, 1);
        scripts.commandCode.splice(choice-1, 1);
        saveJson(scripts);
      rl.close();
    });
}

var editCommand = () => {
    showMenu();
    scripts = loadJson();
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Select an entry to edit: ', (choice) => {
        console.log("Current script:\n" + scripts.commandCode[choice-1] + "\n");
        rl.question('Please enter the new script: ', (entry) => {
            var insert = [entry];
            scripts.commandCode.splice(choice-1, 1, insert);
            saveJson(scripts);
            rl.close();
        });
    });
}

var showMenu = () => {
    var scripts = loadJson();
    console.log("----------------------------------");
    for(var i = 0; i < scripts.commandName.length; i++){
        console.log("| "+"("+(i+1)+".) "+scripts.commandName[i]);
    }
    console.log("----------------------------------");
}

module.exports = {
    addCommand,
    loadJson,
    loadSelection,
    run,
    deleteCommand,
    editCommand
}
