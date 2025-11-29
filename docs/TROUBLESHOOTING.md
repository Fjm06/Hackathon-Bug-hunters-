# Troubleshooting

## WebRTC Issues

### No video/audio connection
- Check firewall: Allow UDP ports 0-65535 or specifically 3478 (STUN)
- Ensure both browsers allow camera/mic permissions
- Try different browsers (Chrome recommended)

### ICE negotiation fails
- Check console for "ICE failed" logs
- Ensure STUN server is reachable: ping stun.l.google.com
- Try TURN server if behind NAT

### Signaling not working
- Backend running on port 8000?
- WebSocket connection: ws://localhost:8000/ws/signal/room
- Check backend logs for connection errors

## STT Issues

### No captions appear
- Mic permissions granted?
- Backend STT WebSocket connected? Check console
- Fallback to Web Speech API if backend fails

### Poor STT accuracy
- Speak clearly, reduce background noise
- Adjust mic volume
- Web Speech API may vary by browser

## Translation Issues

### Translation not working
- Backend running? Check /translate endpoint
- Fallback shows "[Translated] text"
- Language codes: en, es, fr supported

## General

### App not loading
- Frontend server on port 8080?
- CORS issues? Backend allows all origins in dev

### Performance
- Close other tabs/apps using camera
- Use wired connection for better quality