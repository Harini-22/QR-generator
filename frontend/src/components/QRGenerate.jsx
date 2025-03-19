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
    <div className="bg-[#404040] min-h-screen flex flex-col lg:justify-around max-lg:pt-8">
      <div className="flex flex-col items-center justify-center max-lg:pt-8">
        {generated ? (
            <QRCodeComponent
              qrValue={qrValue}
              onBack={() => setGenerated(false)}
            />
        ) : (
          <div className="lg:w-1/2 p-4 rounded-md bg-[#2e2e2e] border border-gray-300">
            <div className="h-full text-center">
              <ReactQuill ref={quillRef} value={text} onChange={setText} />
              {/* {generated ? (
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
              />
            </>
          )} */}
            </div>
            <div className="bg-[#404040] mt-2.5 px-2.5 py-5 rounded-md flex justify-end">
              <button
                onClick={() => setText("")}
                className="text-[#eddb39] px-4 py-2 font-bold mr-10"
              >
                Clear
              </button>
              <button
                onClick={generateQR}
                className="text-[#2b2e2e] font-bold px-4 py-2 rounded-lg bg-[#eddb39]"
              >
                Generate QR
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRGenerate;
