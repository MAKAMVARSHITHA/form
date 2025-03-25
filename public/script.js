// public/script.js
document.getElementById("infoForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent form submission from refreshing the page

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;

    document.getElementById("infoForm").reset();

    // Send the data to the backend using Fetch API (POST request)
    fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Tell the server that we're sending JSON
        },
        body: JSON.stringify({ name, email, age }) // Convert the form data into JSON format
    })
    .then(response => response.json()) // Parse the JSON response from the server
    .then(data => {
        // Display the server's response in the "output" area
        document.getElementById("output").textContent = `${data.message}`;
    })
    .catch(error => {
        // Handle any errors
        console.error('Error:', error);
    });
});