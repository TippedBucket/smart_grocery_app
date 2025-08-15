# Smart Grocery App Setup Instructions

Follow these steps to get the Smart Grocery App running on your machine. This includes both the backend (FastAPI) and the frontend (React Native via Expo).

---

## Backend Setup

# Navigate to the backend folder and create a virtual environment
cd backend
python -m venv backend

# Activate the virtual environment
# Windows
backend\Scripts\activate
# Mac/Linux
# source backend/bin/activate

# Install the required Python packages for the backend
pip install fastapi uvicorn pydantic
pip install requests beautifulsoup4  # needed for web scraping (Step 4)

# Start the FastAPI server
uvicorn main:app --reload

# The backend runs at: http://127.0.0.1:8000
# Test the API in your browser at: http://127.0.0.1:8000/docs

---

## Frontend Setup

# Install Node.js and npm from https://nodejs.org/

# Install Expo CLI globally
npm install -g expo-cli

# Navigate to frontend and install dependencies
cd frontend/grocery-app
npm install  # install project dependencies

# Run the Expo development server
expo start

# Press w → run in browser
# Press a → run on Android emulator
# Scan the QR code → run on a physical device using Expo Go

---

## Notes

# Make sure the backend is running before testing the frontend

# For browser testing, you might need to add CORS middleware in FastAPI to allow requests from your frontend:
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for development, replace with your frontend URL in production
    allow_methods=["*"],  # allow GET, POST, OPTIONS, etc.
    allow_headers=["*"]   # allow all headers
)
