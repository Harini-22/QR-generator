import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeComponent = ({ qrValue, onBack }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white shadow-lg p-6 rounded-lg w-80">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Your QR Code</h2>
      <QRCodeCanvas value={qrValue} size={200} />
      <a href={qrValue} target="_blank" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
        Open Page
      </a>
      <button onClick={onBack} className="mt-3 text-gray-600 underline">
        Generate Another
      </button>
    </div>
  );
};

export default QRCodeComponent;
