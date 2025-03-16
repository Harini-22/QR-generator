import React, { useState } from 'react';
import axios from 'axios';
import QRCodeComponent from './QRCodeComponent';

const QRGenerate = () => {
  const [text, setText] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [generated, setGenerated] = useState(false);

  const generateQR = async () => {
    if (!text) return alert("Please enter text!");

    try {
      const { data } = await axios.post('http://localhost:5000/generate', { text });
      setQrValue(text);
      setGenerated(true);
    } catch (error) {
      console.error("Error generating QR Code", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
        {generated ? (
          <QRCodeComponent qrValue={qrValue} onBack={() => setGenerated(false)} />
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-800">QR Code Generator</h1>
            <div className='flex flex-col'>
            <input 
              type="text" 
              placeholder="Enter text" 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              className="w-full p-2 border rounded-md mt-4"
            />

            <button 
              onClick={generateQR} 
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Generate QR Code
            </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QRGenerate;
