# Architecture

## Overview
WebRTC-based video call app with real-time captions and translation.

## Components

### Frontend (HTML/CSS/JS)
- **index.html**: UI layout
- **style.css**: Centered, responsive design
- **script.js**: Main initialization
- **webrtc_basic.js**: WebRTC peer connection, signaling
- **captions_realtime.js**: STT with server/client fallbacks
- **translation_engine.js**: Translation with backend/client fallbacks

### Backend (FastAPI/Python)
- **main.py**: App entry, routes, CORS
- **signaling.py**: WebRTC signaling via WebSockets
- **stt.py**: Server-side STT stub (WebSocket)
- **translate.py**: Translation API stub
- **utils.py**: Helpers (room ID generation)

## Data Flow

1. User joins room → WebRTC signaling establishes P2P connection
2. Audio captured → STT (server WS or client API) → captions displayed
3. Captions translated (backend API or client fallback) → shown under video

## Fallbacks
- STT: Server WebSocket → Web Speech API
- Translation: Backend /translate → Client "[Translated] text"
- WebRTC: STUN server, auto-retry ICE

## Protocols
- WebRTC for video/audio
- WebSockets for signaling, STT
- HTTP POST for translation