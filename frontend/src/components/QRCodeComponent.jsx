import React, { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeComponent = ({ qrValue, onBack }) => {
  const qrRef = useRef(null);

  // Function to download QR as an image
  const downloadQR = (format) => {
    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) return;

    let imageURL;
      imageURL = canvas.toDataURL(`image/${format}`);
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = `qr-code.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-[#404040] ">
      <div className="w-fit p-4 rounded-md bg-[#2e2e2e] border border-gray-300">
        <div
          ref={qrRef}
          className="flex flex-col items-center justify-center bg-white shadow-lg py-6 rounded-lg"
        >
          <QRCodeCanvas value={qrValue} size={200} />
        </div>

        <div className="flex gap-4 justify-center items-center bg-[#404040] mt-4 rounded-md px-4 py-5">
          <a
            href={qrValue}
            target="_blank"
            className="font-bold px-4 py-2 rounded-lg bg-[#eddb39]"
          >
            Open Page
          </a>
          <button onClick={onBack} className="text-[#eddb39] font-bold">
            Generate Another
          </button>
        </div>
      </div>

      {/* Download Options */}
      <div className="flex gap-4 justify-center items-center mt-4">
        <button
          onClick={() => downloadQR("png")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Download PNG
        </button>
        <button
          onClick={() => downloadQR("jpg")}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Download JPG
        </button>
      </div>
    </div>
  );
};

export default QRCodeComponent;
