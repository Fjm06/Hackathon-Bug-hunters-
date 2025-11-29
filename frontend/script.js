// Main script to initialize the video call app

document.getElementById('joinBtn').addEventListener('click', async () => {
    const roomId = document.getElementById('roomId').value;
    console.log('Joining room:', roomId);

    // Start local video
    await startLocalVideo();

    // Join WebRTC call
    joinCall(roomId);

    // Initialize captions
    initCaptions();

    // Update status
    updateStatus('Connected');
});

function updateStatus(status) {
    document.getElementById('status').textContent = `Status: ${status}`;
}

// Initial status
updateStatus('Waiting');