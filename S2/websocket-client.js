const WS = new WebSocket('ws://localhost:3232');

document.forms[0].onsubmit = ()=>{

    let input = document.getElementById('message');
    //console.log(input.value);

    WS.send(input.value);

};

WS.onopen = ()=>{

    //console.log('CONNECTION OPEN');
    displayTitle('CONNECTION OPEN');

};

function displayTitle(title){

        document.querySelector('h1').innerHTML = title;
};

function displayMessage(message){

    let h1 = document.createElement('li');

    h1.innerText = message;

    document.querySelector('ul.messages').appendChild(h1);
};


WS.onclose = ()=>{

   // console.log('CONNECTION CLOSED');
    displayTitle('CONNECTION CLOSED');
};



WS.onmessage = (payload) => {

    displayMessage(payload.data);

    //console.log(payload.data);

};