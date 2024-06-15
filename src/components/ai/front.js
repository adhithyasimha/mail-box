import React, { useState } from 'react';
import axios from 'axios';

function Ai() {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleClick = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/ai', { prompt });
      if (response.data.success) {
        setOutput(JSON.stringify(response.data.data, null, 2));
        setError('');
      } else {
        setError(response.data.error);
        setOutput('');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred while generating the email.');
      setOutput('');
    }
  };

  return (
    <div>
      <input type="text" value={prompt} onChange={handleChange} />
      <button onClick={handleClick}>Generate</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <pre>{output}</pre>
    </div>
  );
}

export default Ai;
