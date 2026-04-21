import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white p-8 md:p-16 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-cyan-400">About ChromaFall</h1>
      
      <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
        <p>
          Welcome to <strong>ChromaFall</strong>, the ultimate modern block-puzzle experience designed for both desktop and mobile gamers.
        </p>

        <h2 className="text-2xl font-semibold text-blue-300 mt-8">Our Mission</h2>
        <p>
          Our goal is to revive the classic thrill of falling-block puzzles while injecting it with a stunning modern aesthetic, seamless cross-platform responsive play, and a smooth intuitive interface. We believe that great games should be accessible from anywhere without heavy downloads.
        </p>

        <h2 className="text-2xl font-semibold text-blue-300 mt-8">How To Play</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Objective:</strong> Strategically place colored falling blocks to clear horizontal lines.</li>
          <li><strong>Desktop Controls:</strong> Use your keyboard Arrow Keys or A/D to move, Space/Up to rotate, and S/Down to drop.</li>
          <li><strong>Mobile Controls:</strong> Use intuitive swipe and tap gestures to control the pieces directly on your screen.</li>
          <li><strong>Progression:</strong> Advance through levels 1 to 10. As you level up, the speed increases and the puzzle grid expands, challenging your reflexes!</li>
        </ul>

        <h2 className="text-2xl font-semibold text-blue-300 mt-8">Future Development</h2>
        <p>
          We are constantly working to improve ChromaFall. Future updates will include global leaderboards, new block mechanics, and exciting visual themes. 
        </p>
      </div>
    </div>
  );
}
