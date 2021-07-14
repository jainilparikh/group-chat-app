// connect to server

var socket = io.connect('http://localhost:1003');

// Sleep Function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

// Query DOM Element

var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

console.log(message);

// Button Event Listner
btn.addEventListener('click', function () {
    console.log('Message clicked');
    console.log(message);
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
})

// Message box Event listner
message.addEventListener('keydown', function() {
    console.log("Message is being sent");
    socket.emit('typing', {
        handle: handle.value
    })
})

//Listen to events
socket.on('chat', function(data) {
    output.innerHTML += '<p> <strong>' + data.handle + ': </strong>' + data.message + '</p>';
})

socket.on('typing', function(data) {
    feedback.innerHTML = '<p>' + data.handle + '&nbsp; is Typing </p>';
    const func = async() => {
        console.log('Time in milliseconds')
        await sleep(200);
        console.log('Reached Here')
        feedback.innerHTML = "";
    }
    func();
})