// --- MILESTONE 2 START (Real-Time Captions) ---
let sttWs;
let recognition;
let isUsingServerSTT = true;

function initCaptions() {
    console.log('Initializing captions');
    try {
        startServerSTT();
    } catch (error) {
        console.error('Server STT failed, switching to client:', error);
        updateStatus('Using fallback STT');
        startClientSTT();
    }
}

function startServerSTT() {
    const wsURL = `${window.location.origin.replace("http", "ws")}/ws/stt`;
    sttWs = new WebSocket(wsURL);
    sttWs.onopen = () => {
        console.log('STT WebSocket connected');
        // Send audio chunks (stub: send dummy data)
        setInterval(() => {
            if (localStream) {
                // In real implementation, send audio data
                sttWs.send(new Uint8Array(1024)); // Dummy
            }
        }, 1000);
    };

    sttWs.onmessage = (message) => {
        const data = JSON.parse(message.data);
        console.log('STT result:', data.text);
        displayCaption('You', data.text);
    };

    sttWs.onerror = (error) => {
        console.error('STT WebSocket error:', error);
        isUsingServerSTT = false;
        startClientSTT();
    };
}

function startClientSTT() {
    if (!('webkitSpeechRecognition' in window)) {
        console.error('Web Speech API not supported');
        updateStatus('STT not available');
        return;
    }

    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        console.log('Client STT result:', transcript);
        displayCaption('You', transcript);
    };

    recognition.onerror = (error) => {
        console.error('Client STT error:', error);
        updateStatus('STT error');
    };

    recognition.onstart = () => {
        console.log('Client STT started');
        updateStatus('Captioning active');
    };

    try {
        recognition.start();
    } catch (error) {
        console.error('Failed to start client STT:', error);
    }
}

function displayCaption(speaker, text) {
    const captionBox = speaker === 'You' ? 'localCaption' : 'remoteCaption';
    document.getElementById(captionBox).textContent = `${speaker}: ${text}`;
    // In real implementation, handle peer captions via signaling
}

function updateStatus(status) {
    const current = document.getElementById('status').textContent;
    document.getElementById('status').textContent = `${current} | ${status}`;
}
// --- MILESTONE 2 END ---