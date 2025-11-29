from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from signaling import signaling_handler
from stt import stt_handler
from translate import router as translate_router
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve frontend static files
app.mount("/", StaticFiles(directory="../frontend", html=True), name="frontend")

# --- MILESTONE 1 START (WebRTC Setup) ---
@app.websocket("/ws/signal/{room_id}")
async def signaling_websocket(websocket: WebSocket, room_id: str):
    await signaling_handler(websocket, room_id)
# --- MILESTONE 1 END ---

# --- MILESTONE 2 START (Real-Time Captions) ---
@app.websocket("/ws/stt")
async def stt_websocket(websocket: WebSocket):
    await stt_handler(websocket)
# --- MILESTONE 2 END ---

# --- MILESTONE 3 START (Translation Layer) ---
app.include_router(translate_router)
# --- MILESTONE 3 END ---

@app.get("/")
async def root():
    return {"message": "Video Call Backend Running"}