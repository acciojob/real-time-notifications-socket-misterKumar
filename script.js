const statusDiv = document.getElementById("status");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const disconnectButton = document.getElementById("disconnect-button");
const notificationsDiv = document.getElementById("notifications");
const wsUrl = "wss://socketsbay.com/wss/v2/1/demo/";
let socket;

const displayNotification = (message) => {
  const notificationElement = document.createElement("div");
  notificationElement.classList.add("notification");
  notificationElement.innerText = message;
  notificationsDiv.appendChild(notificationElement);
};

const connectWebSocket = () => {
  statusDiv.innerText = "Connecting...";
  socket = new WebSocket(wsUrl);

  socket.onopen = () => {
    statusDiv.innerText = "Connected";
    messageInput.disabled = false;
    sendButton.disabled = false;
    disconnectButton.disabled = false;
  };

  socket.onmessage = (event) => {
    const message = event.data;
    displayNotification(message);
  };

  socket.onclose = () => {
    statusDiv.innerText = "Disconnected";
    messageInput.disabled = true;
    sendButton.disabled = true;
    disconnectButton.disabled = true;
    setTimeout(connectWebSocket, 10000); // Reconnect after 10 seconds
  };
};

const sendMessage = () => {
  const message = messageInput.value.trim();
  if (message !== "") {
    socket.send(message);
    messageInput.value = "";
  }
};

sendButton.addEventListener("click", sendMessage);

disconnectButton.addEventListener("click", () => {
  socket.close();
});

connectWebSocket();
