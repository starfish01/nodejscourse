const fs = require('fs');

if(!fs.exists('views')){
    fs.mkdir('views', (err)=>{
        if(err) return err;

        fs.writeFile('./views/new.html', 'New directory','utf8', (err)=>{
            if(err) return err;

            console.log('everything worked')

        });
    });
}
