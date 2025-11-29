// --- MILESTONE 3 START (Translation Layer) ---
let targetLang = 'en';

async function translateText(text) {
    console.log('Translating text:', text, 'to', targetLang);
    if (targetLang === 'en') return text; // No translation needed

    try {
        const response = await fetch('http://localhost:8000/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, target_lang: targetLang })
        });
        const data = await response.json();
        console.log('Backend translation:', data.translated);
        return data.translated;
    } catch (error) {
        console.error('Backend translation failed:', error);
        return `[Translated] ${text}`; // Fallback
    }
}

function updateTargetLang() {
    targetLang = document.getElementById('languageSelect').value;
    console.log('Target language set to:', targetLang);
}

function displayTranslatedCaption(speaker, originalText) {
    translateText(originalText).then(translated => {
        const captionBox = speaker === 'You' ? 'localCaption' : 'remoteCaption';
        document.getElementById(captionBox).innerHTML = `${speaker}: ${originalText}<br><small>${translated}</small>`;
    });
}

// Override displayCaption to include translation
function displayCaption(speaker, text) {
    displayTranslatedCaption(speaker, text);
}

document.getElementById('languageSelect').addEventListener('change', updateTargetLang);
// --- MILESTONE 3 END ---