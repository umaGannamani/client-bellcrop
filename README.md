# Bellcorp Event Management – Frontend

Frontend application for the Bellcorp Event Management System.

Live Links:
https://server-bellcrop-backend.onrender.com/

https://client-bellcrop.vercel.app/

---

##  Tech Stack

- React.js
- React Router
- React Icons
- Context API (Authentication)
- Fetch API
- Render / Vercel (Deployment)

---

##  Project Structure

```
bellcorp-event-app/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── App.js
│   └── index.js
│
├── package.json
└── README.md
```

---

##  Features

- View all events
- Search events (with clear icon)
- View event details
- Register for events
- Seat availability counter (Available / Total)
- Sold Out indicator
- Cancel registration
- Dashboard:
  - Upcoming Events
  - Past Events
- Protected routes
- Back button navigation
- JWT authentication
- Responsive UI

---

##  Backend Connection

The frontend connects to:

```
https://server-bellcrop-backend.onrender.com
```

Example API call:

```js
fetch("https://server-bellcrop-backend.onrender.com/api/events")
```

---


##  Installation

Clone the repository:

```bash
git clone https://github.com/umaGannamani/client-bellcrop.git
cd bellcorp-event-app
cd client
```

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm start
```

App runs on:

```
http://localhost:3000
```

---

##  Pages

- `/` → Home (Explore Events + Search)
- `/events` → Registered Events
- `/events/:id` → Event Details
- `/dashboard` → Upcoming & Past Events
- `/login`
- `/register`

---

##  Seat Availability Logic

- Displays: `availableSeats / capacity`
- When user registers → seats decrease
- When user cancels → seats increase
- When `availableSeats === 0` → "Not Available" shown

---

##  Authentication

- JWT token stored in localStorage
- Protected routes for:
  - Dashboard
  - Registered Events
  - Event Registration

---

##  Deployment

Frontend can be deployed on:

- Render
- Vercel (used)
- Netlify

After deployment, update CORS in backend to allow frontend URL.

---

##  Author

Bellcorp Event Management Project
