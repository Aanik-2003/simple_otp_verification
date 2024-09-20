import React, { useState } from 'react';
import axios from 'axios';
import './Main.css'; 

const Main = () => {
  const [code, setCode] = useState(Array(6).fill(''));
  const [error, setError] = useState('');

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      setError('');

      // Move focus to the next input
      if (value && index < 5) {
        document.getElementById(`digit-${index + 1}`).focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData('text').split('');
    if (pastedData.length === 6 && pastedData.every(d => /^\d$/.test(d))) {
      setCode(pastedData);
    } else {
      setError('Invalid input');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const codeStr = code.join('');

    console.log("Submitted Code: ", codeStr); // Log the submitted code

    if (codeStr.length !== 6 || codeStr.split('').some(d => isNaN(d))) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/verify', { code: codeStr });
      console.log("Response: ", response); // Log the response from the server
      if (response.status === 200) {
        window.location.href = '/success';
      }
    } catch (err) {
      console.error("Error: ", err); // Log the error
      setError('7 not allowed at last.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {code.map((digit, index) => (
          <input
            key={index}
            id={`digit-${index}`}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onPaste={handlePaste}
          />
        ))}
      </div>
      {error && <div className="error">{error}</div>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Main;
