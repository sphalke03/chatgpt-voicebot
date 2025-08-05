import { useState } from 'react';

function App() {
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleVoiceInput = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsRecording(true);
      console.log('Voice recognition started. Speak into the mic.');
    };

    recognition.onresult = async (event) => {
      const transcripted = event.results[0][0].transcript;
      setTranscript(transcripted);
      console.log('Transcript:', transcripted);

      try {
        const res = await fetch('https://chatgpt-voicebot.onrender.com/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: transcripted })
        });

        const data = await res.json();
        console.log('AI Response:', data.response);
        setResponse(data.response);

        // Speak the response
        const utterance = new SpeechSynthesisUtterance(data.response);
        speechSynthesis.speak(utterance);

      } catch (error) {
        console.error('Error fetching from backend:', error);
      }

      setIsRecording(false);
    };

    recognition.onerror = (event) => {
      console.error('Recognition error:', event.error);
      setIsRecording(false);
    };

    recognition.start();
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🎙️ ChatGPT Voicebot</h1>
      <button onClick={handleVoiceInput} disabled={isRecording}>
        {isRecording ? 'Listening...' : 'Start Speaking'}
      </button>

      {transcript && (
        <div>
          <p><strong>You:</strong> {transcript}</p>
        </div>
      )}

      {response && (
        <div>
          <p><strong>AI:</strong> {response}</p>
        </div>
      )}
    </div>
  );
}

export default App;
