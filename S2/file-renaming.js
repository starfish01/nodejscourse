const fs = require('fs');


try {
    fs.renameSync('./newFile.js', 'newDir/newFile2.js')
} catch (error) {
    console.log(error + '');
}
