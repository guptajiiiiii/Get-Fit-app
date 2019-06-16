
const socket = io.connect('http://localhost:8909');
const messageContainer = document.getElementById('message-container')
const roomContainer = document.getElementById('room-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
// const tst = document.getElementById('send-button')

if (messageForm != null) {
    console.log("i am a fucker");
  const name = prompt('What is your name?')
  appendMessage('You joined')
  socket.emit('new-user', roomName, name)
   console.log(roomName);
  messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    console.log("TEST",roomName, name)
    socket.emit('send-chat-message', roomName, message)
    messageInput.value = ''
  })
}

// function send_msg(){
//   const message = messageInput.value
//   appendMessage(`You: ${message}`)
//   console.log("TEST",roomName, name)
//   socket.emit('send-chat-message', roomName, message)
//   messageInput.value = ''
// }

socket.on('room-created', room => {
  // console.log("lelo");
  const roomElement = document.createElement('div')
  roomElement.innerText = room
  const roomLink = document.createElement('a')
  roomLink.href = `/${room}`
  roomLink.innerText = 'join'
  roomContainer.append(roomElement)
  roomContainer.append(roomLink)
})

socket.on('chat-message', data => {
  // console.log(data);
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
  appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}
