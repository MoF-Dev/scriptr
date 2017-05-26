const fs = require('fs');

var loadJson = () => {
  try{
    var json = fs.readFileSync('Scriptr.json');
    return JSON.parse(json);
  }
  catch(e){
    return [];
  }
};

var loadSelection = (choice) => {
    var json = loadJson();
    return json.commandCode[choice];
}

module.exports = {
    loadJson,
    loadSelection
}
