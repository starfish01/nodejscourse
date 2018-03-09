const WS = new WebSocket('ws://localhost:3232');

document.forms[0].onsubmit = ()=>{

    let input = document.getElementById('message');
    //console.log(input.value);

    WS.send(input.value);

};

WS.onopen = ()=>{

    console.log('CONNECTION OPEN');
    displayTitle('CONNECTION OPEN');

};

function displayTitle(title){

        document.querySelector('h1').innerHTML = title;
};


WS.onclose = ()=>{

    console.log('CONNECTION CLOSED');
    displayTitle('CONNECTION CLOSED');
};



WS.onmessage = (payload) => {

    console.log(payload.data);

};