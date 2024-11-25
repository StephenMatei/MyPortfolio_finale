Portfolio Project Documentation
1. Project Overview
This portfolio project is designed to showcase your skills, experience, and the work you've done in the field of Information and Communication Technology Management. The portfolio features various sections such as your bio, projects, skills, and contact information. It is developed using HTML and CSS with potential for future enhancements using JavaScript.

Key Features:

Responsive Design: The portfolio is designed to work seamlessly across devices (desktop, tablet, mobile).
Interactive Design: Includes a contact form where visitors can reach out to you directly.
Project Showcase: Displaying completed projects to highlight your work and expertise.
Skills Section: Showcasing your technical skills and tools you're proficient with.
Technologies Used:

HTML: For structuring the content.
CSS: For styling and layout.
JavaScript (Optional for future enhancements): To add interactivity such as form validation and dynamic content.
Google Sheets/Google Apps Script: To handle form submissions.
2. Project Structure
The project is organized into the following components:

Directory Structure:
bash
Copy code
/portfolio
  ├── /assets
  │    └── (images, icons, fonts, etc.)
  ├── index.html
  ├── /css
  │    └── style.css
  ├── /js
  │    └── app.js (optional for dynamic functionality)
  ├── /images
  │    └── (Images used in the portfolio)
index.html: The main HTML file containing the structure of the portfolio, including sections such as Home, About, Projects, and Contact.
style.css: The main stylesheet that handles the layout, colors, fonts, and other styling aspects of the portfolio.
app.js: JavaScript file (optional) for handling interactivity such as form submissions, animations, etc.
assets/images: Folder containing all images, icons, and other media used in the portfolio.
3. Features and Sections
Home Section
Introduction to the portfolio.
Brief description about you and your professional background.
About Section
A detailed description of your education, skills, and any relevant experience.
This section may also include a short professional bio and your personal mission statement.
Projects Section
A display of the different projects you've worked on.
Each project includes:
A title.
A description of the project.
Technologies used.
A link to the live project (if available) or a GitHub repository link.
Skills Section
A list or visual representation (such as icons or progress bars) of your technical skills.
Skills are categorized (e.g., Frontend, Backend, Tools, etc.).
Contact Section
A form where visitors can send messages directly to you.
Includes fields for Name, Email, and Message.
The form data is sent to a Google Sheet via a Google Apps Script web app for easy handling.
4. Setup Instructions
Step 1: Setting Up the Portfolio Locally
Clone or download the portfolio repository.
Open the project directory on your local machine.
Open index.html in a web browser to view the portfolio.
Modify style.css and index.html to personalize the content.
Step 2: Google Apps Script for Contact Form (Optional)
Create a new Google Sheet to store contact form submissions.

Add the columns: name, email, message, and timestamp.
Go to Google Apps Script and create a new project.

Add the following code to your Apps Script editor:

javascript
Copy code
var sheetName = 'Sheet1'; // The name of the sheet where form data will be stored
var scriptProp = PropertiesService.getScriptProperties();

function initialSetup() {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Lock the script to prevent simultaneous edits

  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    var sheet = doc.getSheetByName(sheetName);

    // Get headers from the first row of the sheet
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;

    // Map form data to the correct columns, adding a timestamp for submission
    var newRow = headers.map(function (header) {
      return header === 'timestamp' ? new Date() : e.parameter[header];
    });

    // Insert the new data into the next available row
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    // Return success response with the row number
    return ContentService.createTextOutput(
      JSON.stringify({ result: 'success', row: nextRow })
    ).setMimeType(ContentService.MimeType.JSON).setHeaders({
      'Access-Control-Allow-Origin': '*', // Allow cross-origin requests
    });
  } catch (error) {
    // Log any errors and return an error response
    Logger.log(error);
    return ContentService.createTextOutput(
      JSON.stringify({ result: 'error', error: error.message })
    ).setMimeType(ContentService.MimeType.JSON).setHeaders({
      'Access-Control-Allow-Origin': '*', // Allow cross-origin requests
    });
  } finally {
    lock.releaseLock();
  }
}
Deploy the script as a web app and get the deployment URL.

In the app.js file of your portfolio, update the scriptURL to the Google Apps Script URL.

5. Future Improvements
Dynamic Projects: Add functionality to load projects dynamically from an external source or API.
Responsive Design: Improve responsiveness for various screen sizes using media queries.
JavaScript Enhancements: Add interactive elements like animations, scroll effects, or validation for the contact form.
Hosting: Deploy the portfolio on platforms like GitHub Pages, Netlify, or any cloud hosting provider.
6. Testing
Contact Form: Test the form by submitting data. Check that the data is correctly captured in the Google Sheet.
Responsive Testing: Verify the portfolio displays well on different devices (desktop, tablet, mobile).
Project Links: Test all links (GitHub, live project links) to ensure they work correctly.
