const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500'
];
const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
};

const calculateStarRating = (rating) => {
    return (rating / 20).toFixed(1);
  };
  
  const Bgcolor = getRandomColor()
  const htmlContent = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>FlipManga Newsletter</title>
      <style>
          /* General Reset */
          body, h1, h2, h3, p, a {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
          }
          body {
              background-color: #f7f7f7;
              color: #333;
              font-size: 16px;
              line-height: 1.6;
              padding: 20px;
          }
          a {
              color: #1D72B8;
              text-decoration: none;
          }
          img {
              max-width: 100%;
              height: auto;
          }
  
          /* Container for the email */
          .email-container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
  
          /* Header */
          .email-header {
              text-align: center;
              padding-bottom: 20px;
              border-bottom: 2px solid #f1f1f1;
              margin-bottom: 20px;
          }
          .email-header img {
              width: 150px;
          }
  
          .email-header h1 {
              font-size: 28px;
              color: #1D72B8;
          }
  
          .email-body {
              text-align: center;
          }
  
          .email-body h2 {
              font-size: 24px;
              margin-bottom: 15px;
              color: #333;
          }
  
          .email-body p {
              font-size: 16px;
              margin-bottom: 20px;
              color: #555;
          }
  
          /* Button */
          .button {
              background-color: #1D72B8;
              color: white;
              padding: 10px 20px;
              border-radius: 5px;
              font-size: 18px;
              font-weight: bold;
              text-align: center;
              display: inline-block;
              margin-bottom: 20px;
          }
  
          /* Footer */
          .footer {
              text-align: center;
              font-size: 14px;
              color: #777;
              margin-top: 30px;
          }
  
          .footer a {
              color: #1D72B8;
          }
  
          /* Responsive */
          @media (max-width: 600px) {
              .email-container {
                  padding: 10px;
              }
              .email-header h1 {
                  font-size: 24px;
              }
              .email-body h2 {
                  font-size: 20px;
              }
          }
      </style>
  </head>
  <body>
  
      <div class="email-container">
          <!-- Header -->
          <div class="email-header">
              <h1>Welcome to FlipManga!</h1>
          </div>
  
          <!-- Body -->
          <div class="email-body">
              <h2>Thank you for subscribing to our Manga Newsletter!</h2>
              <p>We're thrilled to have you as part of our community! You'll be the first to know about the latest manga releases, updates, and exclusive content directly in your inbox.</p>
  
              <p>Here’s what you can expect from FlipManga:</p>
              <ul>
                  <li>Exclusive manga updates and releases</li>
                  <li>Special discounts and offers on manga merchandise</li>
                  <li>Access to fan art, community events, and much more!</li>
              </ul>
  
              <a href="https://www.flipmanga.com" class="button">Start Exploring Now</a>
  
              <p>If you have any questions or need support, feel free to <a href="mailto:support@flipmanga.com">contact us</a> at any time. We're here to help!</p>
          </div>
  
          <!-- Footer -->
          <div class="footer">
              <p>You're receiving this email because you subscribed to FlipManga Newsletter.</p>
              <p>If you no longer wish to receive updates, <a href="https://www.flipmanga.com/unsubscribe">unsubscribe here</a>.</p>
              <p>&copy; 2024 FlipManga. All rights reserved.</p>
          </div>
      </div>
  
  </body>
  </html>
  ` ;
  
  export {
    Bgcolor ,
calculateStarRating ,
htmlContent
  }