import React from "react";

function Header() {
  return (
    <div className="flex items-center justify-center mx-auto gap-2">
      <img src="/qr-logo.png" className="w-8 h-8 lg:w-12 lg:h-12"/>
      <h1 className="text-xl lg:text-3xl font-bold text-[#eddb39]">QR Generator</h1>
    </div>
  );
}

export default Header;
