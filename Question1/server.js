const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const ENTRY_FILE = "data/entries.json";

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'guestbook_frontend.html'));
});


app.post("/api/entries", (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: "Name and message are required" });
  }

  const newEntry = {
    id: Date.now().toString(),
    name,
    message
  };

  fs.promises.readFile(ENTRY_FILE, "utf-8")
    .then(data => {
      let entries = [];
      try {
        entries = JSON.parse(data);
      } catch (err) {
        entries = [];
      }
      entries.unshift(newEntry);
      return fs.promises.writeFile(ENTRY_FILE, JSON.stringify(entries, null, 2));
    })
    .then(() => res.status(201).json(newEntry))
    .catch(err => res.status(500).json({ error: "Server error", details: err }));
});

app.get("/api/entries", (req, res) => {
  fs.promises.readFile(ENTRY_FILE, "utf-8")
    .then(data => {
      let entries = [];
      try {
        entries = JSON.parse(data);
      } catch (err) {
        entries = [];
      }
      res.json(entries);
    })
    .catch(err => res.status(500).json({ error: "Server error", details: err }));
});

app.delete("/api/entries/:id", (req, res) => {
  const { id } = req.params;

  fs.promises.readFile(ENTRY_FILE, "utf-8")
    .then(data => {
      let entries = [];
      try {
        entries = JSON.parse(data);
      } catch (err) {
        entries = [];
      }

      const index = entries.findIndex(entry => entry.id === id);

      if (index === -1) {
        return res.status(404).json({ error: "Entry not found" });
      }

      entries.splice(index, 1);

      return fs.promises.writeFile(ENTRY_FILE, JSON.stringify(entries, null, 2))
        .then(() => res.json({ success: true }));
    })
    .catch(err => res.status(500).json({ error: "Server error", details: err }));
});

// Start server
app.listen(PORT, () => {
  console.log(`Guestbook API running on http://localhost:${PORT}`);
});
