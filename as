import express from 'express';

import qr from 'qrcode';
import path from 'path';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
const parentDir = path.resolve(__dirname, '..');

app.set('views', path.join(parentDir, 'views'));

// Define a route that generates a QR code and renders an EJS template
app.get('/', (req, res) => {
  const data = 'replace your secret code'; // Replace with your desired data (URL, text, etc.)

  // Generate the QR code
  qr.toDataURL(data, (err, qrCodeDataUrl) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error generating QR code');
    }

    // Render the EJS template and pass the QR code data URL to it
    res.render('index', { qrCodeDataUrl });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
