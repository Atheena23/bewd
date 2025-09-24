# Guestbook App - Backend Assignment

## Overview
You are given a complete **frontend (HTML, CSS, JS)** for a Guestbook application.  
Your task is to build the **backend API** using **Node.js + Express + fs**.

Visitors should be able to:
- Add their name & message
- View all guestbook entries
- Delete an entry

---

## Requirements

### 1. Data Storage
- Store all entries in a file called `entries.json`.
- Each entry should have:
  - `id` (unique string, e.g. Date.now())
  - `name`
  - `message`

Example:
```json
[
  {
    "id": "1695412345678",
    "name": "Alice",
    "message": "Hello, great site!"
  }
]


You must implement the following Express routes:

🔹 Get all entries

GET /api/entries

When the page loads, the frontend calls this route to fetch all entries.

Your backend should read from entries.json and return all entries.

Example Response:

[
  { "id": "1695412345678", "name": "Alice", "message": "Hello, great site!" },
  { "id": "1695419876543", "name": "Bob", "message": "Nice project!" }
]


🔹 Add a new entry

POST /api/entries

When a visitor submits the form (name + message), the frontend sends a POST request.

Your backend should:

Read existing entries from entries.json

Create a new entry with a unique id

Add it to the array

Save back to entries.json

Request Body Example:

{
  "name": "Charlie",
  "message": "This is fun!"
}


Response Example:

{
  "id": "1695420001122",
  "name": "Charlie",
  "message": "This is fun!"
}

🔹 Delete an entry

DELETE /api/entries/:id

When the delete button is clicked, the frontend sends a DELETE request with the entry’s id.

Your backend should:

Find the entry with the matching id

Remove it from the array

Save the updated array back to entries.json

Request Example:

DELETE /api/entries/1695419876543


Response Example (success):

{ "success": true }


Response Example (not found):

{ "error": "Entry not found" }