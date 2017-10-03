const fs = require('fs');
const readline = require('readline');
var cmd = require('node-cmd');

var createJson = () => {
    try{
        fs.writeFileSync(process.env.HOME||process.env.USERPROFILE+'/.scriptr.json', '{"commandName":[], "commandCode":[]}');
        return loadJson();
    }
    catch(e){
        return e
    }
}

var loadJson = () => {
  try{
    var json = fs.readFileSync(process.env.HOME||process.env.USERPROFILE+'/.scriptr.json');
    return JSON.parse(json);
  }
  catch(e){
    createJson();
    return false;
  }
};

var loadSelection = (choice) => {
    var json = loadJson();
    return json.commandCode[choice];
}

var parseScript= (script) => {
    return script.split(";");
}

var addCommand = () => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Please input a title for your script: ', (title) => {
      var scripts = loadJson();
      scripts.commandName.push(title);
      rl.question('Please input the script commands (seperate individual commands with ";"):\n', (input) => {
        scripts.commandCode.push(parseScript(input));
        saveJson(scripts);
        rl.close();
        return "Sucessfully added Script";
      })

    });
    // var json = loadJson();
    // json.commandName.push(title);
    // json.commandCode.push(parseScript(script));
    // saveJson(json);
    // return "Successfully Added Command\n"
}

var saveJson = (json) => {
    console.log(json);
    fs.writeFileSync(process.env.HOME||process.env.USERPROFILE+'/.scriptr.json', JSON.stringify(json));
}

var run = () => {
	if(showMenu())
	{
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
}

var deleteCommand = () => {
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
	if (scripts.commandName.length == 0)
	{
		addCommand();
		return false;
	}
    console.log("----------------------------------");
    for(var i = 0; i < scripts.commandName.length; i++){
        console.log("| "+"("+(i+1)+".) "+scripts.commandName[i]);
    }
    console.log("----------------------------------");
	return true;
}

var runCommand = (cmdname) => {
    var scripts = loadJson();
	if (scripts.commandName.length == 0)
	{
		console.log("command "+cmdname+" not found");
		return false;
	}
    console.log("----------------------------------");
    for(var i = 0; i < scripts.commandName.length; i++){
        if(scripts.commandName[i]==cmdname)
		{
			commands = loadSelection(i);
			for(var j = 0; j < commands.length; j++)
			{
				cmd.get(
					commands[j],
					function(err, data, stderr){
						console.log(data||err||stderr);
					}
				);
			}
			console.log("----------------------------------");
			return true;
		}
    }
    console.log("command "+cmdname+" not found");
	return false;
}

module.exports = {
    addCommand,
    loadJson,
    loadSelection,
    run,
    deleteCommand,
    editCommand,
	runCommand
}
