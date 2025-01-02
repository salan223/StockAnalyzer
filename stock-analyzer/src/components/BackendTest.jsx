import React, { useState } from 'react';
import axios from 'axios';

const BackendTest = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const testBackend = async () => {
    try {
      setError('');
      const response = await axios.get('http://127.0.0.1:5000/api/test');
      setMessage(response.data.message);
    } catch (err) {
      setError('Failed to connect to backend.');
      console.error(err);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <button
        onClick={testBackend}
        style={{
          padding: '10px 20px',
          backgroundColor: '#334155',
          color: '#f1f5f9',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Test Backend Connection
      </button>
      {message && <p style={{ color: 'green', marginTop: '1rem' }}>{message}</p>}
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
};

export default BackendTest;
