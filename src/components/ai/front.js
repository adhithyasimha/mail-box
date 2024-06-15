import React, { useState } from 'react';
import axios from 'axios';

function Ai() {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');

  const handleChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleClick = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/generate', { prompt });
      setOutput(response.data.text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="text" value={prompt} onChange={handleChange} />
      <button onClick={handleClick}>Generate</button>
      <p>{output}</p>
    </div>
  );
}

export default Ai;
