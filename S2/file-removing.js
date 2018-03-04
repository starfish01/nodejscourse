const fs = require('fs');


if(fs.existsSync('./newDir/newFile.js')){
    fs.unlinkSync('./newDir/newFile.js');
    console.log('file deleted');
}



if(fs.existsSync('./newDir')){
    fs.rmdirSync('./newDir');
    console.log('folder deleted');
}

console.log('operation completed');

