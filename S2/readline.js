const readLine = require('readline');
const util = require('util');

var RL = readLine.createInterface(process.stdin, process.stdout);

RL.question('What is your name?', (name)=>{
    
    RL.setPrompt(`${name} how old are you?`);

    RL.prompt();

    RL.on('line', (age)=>{
        if(age<18){
            util.log(`${name.trim()} beacuse you are ${age} you cannot proceed`);
            RL.close();
        }else{
            util.log(`${name.trim()} is great that you are ${age} years old`);
            RL.close();
        }


    });

} );
