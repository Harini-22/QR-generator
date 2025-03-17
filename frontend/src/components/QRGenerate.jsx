import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import QRCodeComponent from "./QRCodeComponent";

const QRGenerate = () => {
  const [text, setText] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [generated, setGenerated] = useState(false);
  const quillRef = useRef(null);

  const generateQR = async () => {
    if (!text) return alert("Please enter formatted text!");

    try {
      const { data } = await axios.post("http://localhost:5000/generate", {
        text,
      });
      setQrValue(`http://localhost:3000/view/${data.id}`);
      setText("");
      setGenerated(true);
    } catch (error) {
      console.error("Error generating QR Code", error);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col lg:justify-around max-lg:pt-8">
      <div className="flex flex-col items-center justify-center ">
        <img src="qr-logo.png" className="w-16 h-16" />
        <h1 className="silkscreen-bold text-black">QR GENERATOR</h1>
      </div>
      <div className="flex flex-col items-center justify-center max-lg:pt-8">
        <div className="lg:w-1/2 h-full text-center">
          {generated ? (
            <QRCodeComponent
              qrValue={qrValue}
              onBack={() => setGenerated(false)}
            />
          ) : (
            <>
              <ReactQuill
                ref={quillRef}
                value={text}
                onChange={setText}
                className="h-60"
              />
            </>
          )}
        </div>
        <button
          onClick={generateQR}
          className="mt-14 text-white font-medium px-4 py-2 rounded-lg bg-blue-500"
        >
          Generate QR Code
        </button>
      </div>
    </div>
  );
};

export default QRGenerate;
