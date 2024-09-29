document.getElementById('send-btn').addEventListener('click', function() {
    const message = document.getElementById('user-message').value;
    
    fetch("{% url 'chatbot' %}", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': '{{ csrf_token }}'
        },
        body: `message=${message}`
    })
    .then(response => response.json())
    .then(data => {
        const chatHistory = document.getElementById('chat-history');
        chatHistory.innerHTML += `<strong>You:</strong> ${data.message}<br><strong>Bot:</strong> ${data.response}<br><br>`;
        document.getElementById('user-message').value = '';
    });
});