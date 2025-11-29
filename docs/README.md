# Real-Time Video Call with Captions and Translation

A hackathon-friendly WebRTC video call app with live captions and translation, featuring fault-tolerant fallbacks.

## Quick Start

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend
```bash
cd frontend
python -m http.server 8080
```
Open http://localhost:8080 in two browser tabs, enter the same room ID (e.g., "demo"), and click "Join Call".

## Features
- WebRTC video/audio calls
- Real-time speech-to-text captions
- Live translation (English, Spanish, French)
- Fallbacks for all services
- Hackathon-ready with minimal setup

## Milestone Commit Guide

### Milestone 1: Basic WebRTC
- frontend/index.html
- frontend/style.css
- frontend/webrtc_basic.js
- backend/main.py
- backend/signaling.py

### Milestone 2: Real-Time Captions
- frontend/captions_realtime.js
- backend/stt.py

### Milestone 3: Translation Layer
- frontend/translation_engine.js
- backend/translate.py

## Public Hosting
To make the app accessible via a public URL:

1. Deploy the backend to a platform like Railway, Render, or Heroku.
2. Set the build command to `pip install -r requirements.txt` and start command to `uvicorn main:app --host 0.0.0.0 --port $PORT`.
3. The app serves both backend APIs and frontend static files.
4. Get the public URL from the platform.

## Demo Script
1. Open the public URL in browser
2. Enter a call name (e.g., "demo")
3. Click "Join Call"
4. Share the URL and call name with others
5. Multiple participants can join the same call
6. Speak into microphone - captions appear
7. Change language dropdown - translations show
8. Test fallbacks if backend services fail

## Debugging
- Check browser console for logs
- Backend logs in terminal
- Common issues: firewall, mic permissions, WebRTC ports