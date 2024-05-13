// App.js
import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [chat, setChat] = useState([]);

  const generateResponse = async (input) => {
    const response = await fetch('/api/generateResponse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await response.json();
    return data.response;
  };

  const handleUserInput = async (event) => {
    if (event.key === 'Enter') {
      const userInput = event.target.value;
      setChat([...chat, { user: 'User', text: userInput }]);
      event.target.value = '';

      let aiResponse = await generateResponse(userInput);
      if (!aiResponse) {
        aiResponse = 'I am sorry, I did not understand that.';
      }

      setChat((prevChat) => [...prevChat, { user: 'AI', text: aiResponse }]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <h1>React Bot </h1>
          <p>Created by nick wyrwas</p>
        <div>
          {chat.map((message, index) => (
            <p key={index}><strong>{message.user}:</strong> {message.text}</p>
          ))}
        </div>
        <input type="text" onKeyDown={handleUserInput} />
      </header>
    </div>
  );
}

export default App;