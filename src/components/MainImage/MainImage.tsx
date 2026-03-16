import React, { useState } from 'react';

export function MainImage() {
  const [imageNumber] = useState(() => Math.floor(Math.random() * 6) + 1);

  return (
    <div aria-hidden="true" className="main-image--wrapper relative w-full h-125-px md:h-250-px lg:h-350-px overflow-hidden">
      <div
        className="relative w-screen h-125-px md:h-250-px lg:h-350-px bg-cover bg-center"
        style={{ backgroundImage: `url('/mountains/${imageNumber}.jpg')` }}
      />
      <div className="main-image--overlay z-10 absolute inset-0 w-full" />
    </div>
  );
}
