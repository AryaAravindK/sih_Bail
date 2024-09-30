document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('send-btn').addEventListener('click', function() {
        const message = document.getElementById('user-message').value;

        // Ensure the URL is generated correctly and CSRF token is handled
        fetch("/chatbot/chat/", {  // Make sure this matches the path in your URLs
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
            },
            body: `message=${encodeURIComponent(message)}`  // Properly encode the message
        })
        .then(response => response.json())  // Parse the response as JSON
        .then(data => {
            const chatHistory = document.getElementById('chat-history');
            if (data.error) {
                chatHistory.innerHTML += `<strong>Error:</strong> ${data.error}<br><br>`;
            } else {
                chatHistory.innerHTML += `  <div> <div class="msg"><strong>You:</strong><p> ${data.message}</p></div>
                                                <br>
                                                <div class="res"><strong>Dwani:</strong> <p>${data.response}</p></div>
                
                                            </div>`;
            }
            document.getElementById('user-message').value = '';  // Clear the input
        })
        .catch(error => console.error('Error:', error));  // Catch any errors
    });
});
