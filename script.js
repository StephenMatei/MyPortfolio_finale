// Image Slider
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showNextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

setInterval(showNextSlide, 5000);

// Contact Form Submission to Google Sheets
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission
  
    // Collect data from the form
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries()); // Convert form data to an object
  
    // Your deployed Google Apps Script URL (replace this with the actual URL of your web app)
   document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent default form submission

  // Collect data from the form
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries()); // Convert form data to an object

  // Your deployed Google Apps Script URL (replace this with the actual URL of your web app)
  const scriptURL = 'https://script.google.com/macros/s/AKfycbxpAZroXzMf_UBHMHcqdOPtie2gY5SuPSZZ3ys17wYZ5P1aQA1elOWd_rVeZ_v30zEcSw/exec'; // Replace with your actual URL

  // Send data to the Google Apps Script using fetch API
  fetch(scriptURL, {
    method: 'POST',
    body: new URLSearchParams(data), // Convert data object to URL-encoded string
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
    .then((response) => {
      if (!response.ok) {
        // Handle network errors
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((json) => {
      // Debugging: log the response
      console.log('Response JSON:', json);

      // Handle success or error from the script
      if (json.result === 'success') {
        alert('Your message has been sent successfully!');
        // Reload the page after successful submission
        window.location.reload(); // This will refresh the page
      } else {
        alert('Error submitting your message: ' + JSON.stringify(json.error));
      }
    })
    .catch((error) => {
      // Debugging: log the error
      console.error('Error:', error);
      alert('There was an error: ' + error.message);
    });
   });
});
