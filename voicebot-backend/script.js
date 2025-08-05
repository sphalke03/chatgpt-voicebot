const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';

const synth = window.speechSynthesis;

function startListening() {
  recognition.start();
}

recognition.onresult = async function (event) {
  const userText = event.results[0][0].transcript;
  document.getElementById('userSpeech').innerText = userText;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_OPENAI_API_KEY" // ⛔ Replace this
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are ChatGPT with your own personality. Answer questions about yourself as if you’re a person."
        },
        {
          role: "user",
          content: userText
        }
      ]
    })
  });

  const data = await response.json();
  const gptText = data.choices[0].message.content;

  document.getElementById('gptResponse').innerText = gptText;

  const utter = new SpeechSynthesisUtterance(gptText);
  synth.speak(utter);
};
