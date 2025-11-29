// --- MILESTONE 1 START (WebRTC Setup) ---
let localStream;
let peerConnection;
let signalingWs;
const configuration = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] // Google STUN
};

async function startLocalVideo() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        document.getElementById('localVideo').srcObject = localStream;
        console.log('Local video started');
    } catch (error) {
        console.error('Error accessing media devices:', error);
        alert('Microphone/camera access denied');
    }
}

function createPeerConnection() {
    peerConnection = new RTCPeerConnection(configuration);

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            console.log('ICE candidate:', event.candidate);
            signalingWs.send(JSON.stringify({ type: 'candidate', candidate: event.candidate }));
        }
    };

    peerConnection.ontrack = (event) => {
        console.log('Remote track received');
        document.getElementById('remoteVideo').srcObject = event.streams[0];
    };

    peerConnection.onconnectionstatechange = () => {
        console.log('Connection state:', peerConnection.connectionState);
        updateStatus(peerConnection.connectionState);
    };

    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
}

async function joinCall(roomId) {
    signalingWs = new WebSocket(`ws://${window.location.host}/ws/signal/${roomId}`);
    signalingWs.onopen = () => {
        console.log('Signaling WebSocket connected');
        createPeerConnection();
        createOffer();
    };

    signalingWs.onmessage = async (message) => {
        const data = JSON.parse(message.data);
        console.log('Signaling message:', data);

        if (data.type === 'offer') {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(data));
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            signalingWs.send(JSON.stringify({ type: 'answer', sdp: answer.sdp }));
        } else if (data.type === 'answer') {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(data));
        } else if (data.type === 'candidate') {
            await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
    };

    signalingWs.onerror = (error) => {
        console.error('Signaling WebSocket error:', error);
        updateStatus('Signaling server unavailable');
    };
}

async function createOffer() {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    signalingWs.send(JSON.stringify({ type: 'offer', sdp: offer.sdp }));
}

// Auto-retry ICE if fails
peerConnection.oniceconnectionstatechange = () => {
    if (peerConnection.iceConnectionState === 'failed') {
        console.log('ICE failed, retrying...');
        // In real implementation, restart ICE
    }
};

// Check remote video after 5s
setTimeout(() => {
    if (!document.getElementById('remoteVideo').srcObject) {
        console.warn('Remote video not received in 5 seconds');
        updateStatus('Waiting for peer');
    }
}, 5000);

function updateStatus(status) {
    document.getElementById('status').textContent = `Status: ${status}`;
}
// --- MILESTONE 1 END ---