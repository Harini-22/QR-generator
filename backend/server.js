const express = require('express');
const cors = require('cors');
const QRCode = require('qrcode');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Generate QR Code API
app.post('/generate', async (req, res) => {
  const { text } = req.body;
  
  if (!text) return res.status(400).json({ error: "Text is required!" });

  try {
    const qrCodeData = await QRCode.toDataURL(text);
    res.json({ qrCode: qrCodeData });
  } catch (error) {
    res.status(500).json({ error: "Error generating QR Code" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
