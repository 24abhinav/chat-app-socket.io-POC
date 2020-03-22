let socket = io();
let userName = '';

function basicDetails() {
    userName = prompt('Enter Your Name');
    if(!userName) {
        location.reload();
        return;
    }

    const newUserDetails = {
        name: userName,
        time: moment(new Date().getTime()).format('LT'),
    };
    welcomeMessageTemplate(userName);
    socket.emit('newUser', newUserDetails);
}

function sendMessage() {
    const message = document.getElementById('message').value;
    if(!message) {
        return;
    }
    document.getElementById('message').value = '';
    const messageObj = {
        name: userName,
        time: moment(new Date().getTime()).format('LT'),
        message
    };
    socket.emit('newMessage', messageObj);
    messageTemplate(messageObj);
}

function sendLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
        const messageObj = {
            name: userName,
            time: moment(new Date().getTime()).format('LT'),
            link: `http://google.com/maps/?q=${position.coords.latitude},${position.coords.longitude}`
        };

        socket.emit('newMessage', messageObj);
        messageTemplate(messageObj);
    });
}

// Listeners

socket.on('newUser', (newUserName) => {
    newUserTemplate(newUserName);
});

socket.on('newMessage', (newMessage) => {
    messageTemplate(newMessage);
});

socket.on('getConnectedUsers', (userList) => {
    userList.forEach(element => {
        addPeapletoSideNav(element);
    });
});


// Templates

function messageTemplate(messageData) {
    var div = document.createElement("div");
    div.setAttribute('class', 'messageBody');

    var p = document.createElement("p");
    p.setAttribute('class', 'user');
    p.innerHTML = messageData.name

    var span = document.createElement("span");
    span.innerHTML = messageData.time

    p.appendChild(span);

    var messageBody;

    if(messageData.link) {
        messageBody = document.createElement("a");
        messageBody.setAttribute('target', '_blanck');
        messageBody.setAttribute('href', messageData.link);
        messageBody.innerHTML = `My Location`
    } else {
        messageBody = document.createElement("h4");
        messageBody.innerHTML = messageData.message;
    }
    messageBody.setAttribute('class', 'userMessage');

    div.appendChild(p);
    div.appendChild(messageBody);
    document.getElementsByClassName('messages')[0].appendChild(div);

}


function newUserTemplate(userData) {
    var p = document.createElement('p');
    p.setAttribute('class', 'newUser');
    p.innerHTML = `${userData.name} has joined this conversation at ${userData.time}`;
    document.getElementsByClassName('messages')[0].appendChild(p);
    addPeapletoSideNav(userData.name);
}

function welcomeMessageTemplate(name) {
    var p = document.createElement('p');
    p.setAttribute('class', 'newUser');
    p.innerHTML = `Welcome to the chat Application ${name}`;
    document.getElementsByClassName('messages')[0].appendChild(p);
}


function addPeapletoSideNav(name) {
    const li = document.createElement('li');
    li.innerHTML = name;
    document.getElementById('userList').appendChild(li);
}

