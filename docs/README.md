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

## Demo Script
1. Open two browser windows to http://localhost:8080
2. Enter "demo" as room ID in both
3. Click "Join Call" in both
4. Speak into microphone - captions appear
5. Change language dropdown - translations show
6. Test fallbacks by disconnecting backend

## Debugging
- Check browser console for logs
- Backend logs in terminal
- Common issues: firewall, mic permissions, WebRTC ports