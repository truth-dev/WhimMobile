import React from 'react';

interface Props {
  lines: string[];
}

const OctaviaHologram: React.FC<Props> = ({ lines }) => {
  return (
    <div className="bg-gradient-to-br from-blue-900 to-cyan-600 text-teal-100 p-4 rounded-lg shadow-md font-mono animate-pulse">
      <p className="uppercase text-sm text-cyan-300 mb-2 tracking-wider">[OCTAVIA TRANSMISSION]</p>
      {lines.map((line, idx) => (
        <p key={idx} className="mb-1">{line}</p>
      ))}
    </div>
  );
};

export default OctaviaHologram;
