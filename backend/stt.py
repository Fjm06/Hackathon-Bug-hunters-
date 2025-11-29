import json
import logging
from fastapi import WebSocket, WebSocketDisconnect

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# --- MILESTONE 2 START (Real-Time Captions) ---
async def stt_handler(websocket: WebSocket):
    await websocket.accept()
    logger.info("STT WebSocket connected")

    try:
        while True:
            data = await websocket.receive_bytes()
            logger.info(f"Received audio chunk: {len(data)} bytes")

            # Stub implementation: simulate STT
            try:
                # In real implementation, process audio with STT model
                recognized_text = "Stubbed STT: Hello world"  # Placeholder
                response = {"text": recognized_text}
            except Exception as e:
                logger.error(f"STT processing error: {e}")
                response = {"text": "Error in STT processing"}

            await websocket.send_text(json.dumps(response))
            logger.info(f"Sent STT response: {response}")

    except WebSocketDisconnect:
        logger.info("STT WebSocket disconnected")
# --- MILESTONE 2 END ---