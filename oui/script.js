const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Change this to your graph endpoint
const GRAPH_ENDPOINT = "http://127.0.0.1:2024/run/chatbot_graph";

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", function(e){
    if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
    const msg = userInput.value.trim();
    if (!msg) return;

    appendMessage(msg, "user-message");
    userInput.value = "";

    try {
        // Send user message to LangGraph API
        const response = await fetch(GRAPH_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ input: msg })
        });

        const data = await response.json();

        // The exact path may depend on your graph response structure
        const botReply = data.output || "No response";

        appendMessage(botReply, "bot-message");

    } catch (err) {
        console.error(err);
        appendMessage("Error connecting to server", "bot-message");
    }
}

function appendMessage(text, className) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `message ${className}`;
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

