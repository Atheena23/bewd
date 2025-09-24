# Image Gallery Project

## 📌 Overview
This project is a personal **Image Gallery system**.  
Users can upload images, view them in a dynamic grid, and see feedback messages for success or errors.  
The project teaches **frontend-backend integration** using **HTML, CSS, JavaScript, and Node.js with Express**.

---

## ✨ Features
- 📤 Upload multiple images via **drag-and-drop** or file selection.  
- 🖼️ Display uploaded images in a **responsive gallery grid**.  
- ⏳ Show **upload progress** and success/error messages.  
- ✅ Validate file types to accept only **images**.  
- 🔄 Dynamic gallery updates after upload.  
- 📂 Handle empty gallery gracefully.  

---

## 🖥️ Frontend
**File:** `index.html`  
Built using **vanilla HTML, CSS, and JavaScript**.  

### Features:
- Drag-and-drop upload area  
- "Choose Images" button  
- Upload button with **progress bar**  
- Responsive **gallery display**  
- Success and error messages  

---

## ⚙️ Backend
**File:** `server.js`  
Built with **Node.js, Express, and Multer**.  

### Endpoints:
- `POST /api/upload` → Upload one or more images.  
- `GET /api/images` → Fetch all uploaded images.  

### Functionality:
- Stores images in the **uploads/** folder.  
- Serves images statically for frontend display.  

---
