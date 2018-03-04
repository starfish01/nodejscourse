const fs = require('fs');

fs.writeFile('./modules/data.html', 'Hello this file has just been created', 'utf8', (err)=>{
    if(err) return err;

    console.log("the file has been saved");

});

fs.appendFile('./modules/data.html', 'Hello tdffddf file has just been created', 'utf8', (err)=>{
    if(err) return err;

    console.log("the file has been saved");

});