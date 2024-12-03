#  Square Eyes - JavaScript 1 Course Assignment
This project is an interactive online store built for the JavaScript 1 Course Assignment. The store dynamically fetches product data from an API and allows users to browse, filter, and purchase products. It is developed using HTML, CSS, and JavaScript.

Project Overview
The Square Eyes online store offers users the ability to:

View and filter a list of products.
Access detailed information about individual products.
Add and remove items from their shopping basket.
Proceed through a checkout process with a final confirmation screen.
This project focuses on JavaScript functionality while maintaining usability and accessibility.

Features and Pages
Core Pages
Homepage (html/home.html)

Displays a list of products fetched dynamically from the API.
Includes filtering options by category or other criteria.
Product Page (html/products.html)

Shows detailed information about a single product.
Allows users to add items to their basket.
Checkout Page (html/checkout.html)

Displays all items added to the basket.
Allows users to remove items before proceeding.
Confirmation Page (html/confirmation.html)

Shows a thank-you message after completing the checkout.
Additional Pages
Order History Page (html/order-history.html)

Displays a summary of previous orders (optional feature).
Privacy Policy Page (html/policy.html)

Includes the website’s privacy policy.
Technologies Used
HTML5: Semantic structure for accessibility and SEO.
CSS3: Styling and responsive design for a user-friendly experience.
JavaScript (ES6+): Handles all dynamic content, API interactions, and user functionality.
API Integration: Fetches product data dynamically using an external API.
How to Run the Project
View Live Demo
Check out the live version of the project: Live Demo

Run Locally
Clone the repository:
bash
Kopier kode
git clone https://github.com/Andreasvds10/square-Eyes-Javascript.git
Navigate to the project folder:


Kopier kode
cd square-Eyes-Javascript
Open html/home.html in your browser to start the application.

File Structure

Kopier kode
square-Eyes-Javascript/
├── css/
│   ├── checkout.css
│   ├── confirmation.css
│   ├── home.css
│   ├── order-history.css
│   ├── policy.css
│   └── products.css
├── html/
│   ├── checkout.html
│   ├── confirmation.html
│   ├── home.html
│   ├── order-history.html
│   ├── policy.html
│   └── products.html
├── image/               # Images and other assets
├── js/
│   ├── app.js           # Main JavaScript file
│   ├── hi.js            # Additional script
└── .vscode/             # VS Code workspace settings


Key Features
Dynamic Product Display

Products are fetched from the API dynamically and displayed across the homepage and product pages.
Basket Management

Users can add and remove items from their shopping basket.
The basket is displayed and managed on the checkout page.
Error Handling

Errors from API calls are handled gracefully, and the user is alerted.
Loading Indicators

A loading spinner is displayed while waiting for data to load from the API.
Responsive Design

The site is fully responsive and works on mobile, tablet, and desktop devices.
Testing and Validation
Browser Compatibility: Tested on Chrome, Firefox, Safari, and Edge.
Responsive Design: Verified on various screen sizes.
Accessibility: Complies with WCAG standards to ensure inclusivity.
Debugging: All console.log statements have been removed for final delivery.

Reflection
What I Learned:
Working with external APIs and dynamically rendering content.
Using async/await to handle asynchronous operations.
Building modular and reusable JavaScript code for managing functionality.
Managing user interactions, such as filtering and basket updates.
Contact
For inquiries or feedback:

GitHub Owner: Andreasvds10
Live Demo: Square Eyes Online Store

