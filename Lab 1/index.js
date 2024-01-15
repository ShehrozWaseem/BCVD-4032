// Import required modules
const express = require('express');

// Create an Express application
const app = express();
const port = 3000;

// Define a route for the root URL
app.get('/', (req, res) => {
    // HTML content with inline CSS
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    text-align: center;
                    padding: 20px;
                }
                h1 {
                    color: #007bff;
                }
            </style>
            <title>Docker App</title>
        </head>
        <body>
            <h1>Hey, this is my Docker app! <br/> <b>Name: </b> Shehroz Waseem <br/> <b>ID: </b> 101501973 </h1>
        </body>
        </html>
    `;

    // Send the HTML response
    res.send(htmlContent);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
