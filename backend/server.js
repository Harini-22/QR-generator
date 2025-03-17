const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Define Schema
const TextSchema = new mongoose.Schema({ text: String });
const TextModel = mongoose.model("Text", TextSchema);

// Generate QR Code API
app.post("/generate", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required!" });

  try {
    const newText = new TextModel({ text });
    await newText.save();
    res.json({ id: newText._id });
  } catch (error) {
    res.status(500).json({ error: "Error storing text" });
  }
});

// Retrieve stored text
app.get("/view/:id", async (req, res) => {
  try {
    const textData = await TextModel.findById(req.params.id);
    if (!textData) return res.status(404).json({ error: "Text not found" });

    // Send raw HTML string instead of { text: "<p>Hello</p>" }
    res.send(textData.text);
  } catch (error) {
    res.status(500).json({ error: "Error fetching text" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
