// form.js
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('myForm'); // Replace "myForm" with your form's ID
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Create a FormData object to collect form data
    const formData = {};

    // Loop through form elements and populate the formData object
    for (const input of form.elements) {
      if (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA') {
        // Exclude checkboxes from this example
        console.log(input.value, input.name);
        formData[input.name] = input.value;
      }
    }
    // Make an Axios POST request to your Node.js server
    axios
      .post('http://localhost:5000/api/v1/register', formData) // Replace "/submit" with your server endpoint
      .then(function (response) {
        // Handle the server's response (if needed)
        alert('you are signed successfully');
        window.location.href = 'login.html';
        // You can redirect or show a success message here
      })
      .catch(function (error) {
        // Handle any errors
        console.error('Error:', error);
        // You can show an error message to the user
      });
  });
});
