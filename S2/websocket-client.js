const WS = new WebSocket('ws://localhost:3232');

document.forms[0].onsubmit = ()=>{

    let input = document.getElementById('message');
    //console.log(input.value);

    WS.send(input.value);

};


WS.onmessage = (payload) => {

    console.log(payload.data);

};