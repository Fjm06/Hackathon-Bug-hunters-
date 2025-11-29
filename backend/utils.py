import uuid

def generate_room_id():
    """Generate a unique room ID for video calls."""
    return str(uuid.uuid4())[:8]