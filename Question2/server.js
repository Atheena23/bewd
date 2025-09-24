const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const MEMBERS_FILE = "data/datamembers.json";

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "frontend_Project1.html"));
});

async function readMembers() {
  try {
    const data = await fs.promises.readFile(MEMBERS_FILE, "utf-8");
    return JSON.parse(data || "[]");
  } catch (err) {
    return [];
  }
}

async function writeMembers(members) {
  return fs.promises.writeFile(MEMBERS_FILE, JSON.stringify(members, null, 2));
}

app.post("/api/member", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required" });
  }

  let members = await readMembers();

  if (members.find(m => m.email === email)) {
    return res.status(400).json({ error: "Email already registered" });
  }

  const newMember = {
    id: Date.now().toString(),
    name,
    email,
    password 
  };

  members.push(newMember);
  await writeMembers(members);

  res.status(201).json({ success: true, message: "Registration successful", memberId: newMember.id });
});

app.post("/api/member/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const members = await readMembers();
  const member = members.find(m => m.email === email && m.password === password);

  if (!member) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  res.json({ success: true, message: "Login successful", memberId: member.id });
});

app.get("/api/member", async (req, res) => {
  const { memberId } = req.query;

  if (!memberId) {
    return res.status(400).json({ error: "Missing memberId" });
  }

  const members = await readMembers();
  const member = members.find(m => m.id === memberId);

  if (!member) {
    return res.status(404).json({ error: "Member not found" });
  }

  res.json({ id: member.id, name: member.name, email: member.email });
});

app.post("/api/logout", (req, res) => {
  res.json({ success: true, message: "Logged out successfully" });
});


app.listen(PORT, () => {
  console.log(`Private Club API running at http://localhost:${PORT}`);
});
