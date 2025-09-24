Private Club Membership System Assignment
Overview

In this assignment, you will build a simple authentication system for a private club using Node.js + Express. The system will allow users to:

Apply for membership (register)

Login as a member

Access a members-only area

Logout

You will use a JSON file to store member data. No external authentication libraries are allowed.

Project Goals

Create a backend API using Node.js and Express.

Implement basic member storage using a JSON file.

Implement members-only routes (protected endpoints).

Allow the frontend to register, login, view profile, and logout.

Requirements

Your backend must include the following:

1. Member Registration

Endpoint: POST /api/register

Functionality:

Accepts name, email, and password from the frontend.

Checks if the email is already registered.

Stores the new member in a JSON file with a unique id.

Returns a success or error message.

2. Member Login

Endpoint: POST /api/login

Functionality:

Accepts email and password.

Checks if the email and password match an existing member.

Returns a success message and the member’s id (to simulate session).

3. Members-Only Access

Endpoint: GET /api/profile

Functionality:

Accepts memberId from the frontend (to identify logged-in member).

Checks if the member exists in the JSON file.

Returns the member’s profile (id, name, email).

If the memberId is missing or invalid, return an error.

Note: Only logged-in members can access this route.

4. Logout

Endpoint: POST /api/logout

Functionality:

Clears the member session (in our simple version, frontend can remove memberId).

Returns a success message.

Data Storage

Store all members in a file called members.json.

Example structure:

[
  {
    "id": "123456",
    "name": "Alice Smith",
    "email": "alice@example.com",
    "password": "123456"
  }
]

Frontend

You will use the provided frontend file: project4_frontend.html.

It has:

Registration form

Login form

Dashboard to show member profile

Logout button

Integration:

Frontend sends registration and login requests to your backend.

Upon login, frontend stores memberId and sends it to /api/profile to access the dashboard.