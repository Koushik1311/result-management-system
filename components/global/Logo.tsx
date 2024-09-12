// Quantis

import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-1">
      {/* Logo icon */}
      <Image
        width={40}
        height={90}
        src="/logo.svg"
        alt="logo"
        quality={100}
        className="w-auto h-8"
      />
      {/* Brand name */}
      <span className="text-lg text-black font-semibold">Quantis</span>
    </div>
  );
}
