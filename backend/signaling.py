import json
import logging
from fastapi import WebSocket, WebSocketDisconnect
from typing import Dict, List

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# --- MILESTONE 1 START (WebRTC Setup) ---
rooms: Dict[str, List[WebSocket]] = {}

async def signaling_handler(websocket: WebSocket, room_id: str):
    await websocket.accept()
    logger.info(f"Client connected to room {room_id}")

    if room_id not in rooms:
        rooms[room_id] = []
    rooms[room_id].append(websocket)

    try:
        while True:
            data = await websocket.receive_text()
            logger.info(f"Received message in room {room_id}: {data}")

            message = json.loads(data)
            # Relay to other peers in the room
            for peer in rooms[room_id]:
                if peer != websocket:
                    try:
                        await peer.send_text(data)
                        logger.info(f"Relayed message to peer in room {room_id}")
                    except Exception as e:
                        logger.error(f"Failed to relay message: {e}")

    except WebSocketDisconnect:
        logger.info(f"Client disconnected from room {room_id}")
        if room_id in rooms:
            rooms[room_id].remove(websocket)
            if not rooms[room_id]:
                del rooms[room_id]
                logger.info(f"Room {room_id} deleted")
# --- MILESTONE 1 END ---