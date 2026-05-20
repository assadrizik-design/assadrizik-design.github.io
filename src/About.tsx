import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white p-8 md:p-16 max-w-4xl mx-auto font-sans">
      <h1 className="text-4xl font-bold mb-6 text-cyan-400 border-b border-white/10 pb-4">About ChromaFall</h1>
      
      <div className="space-y-6 text-gray-300 leading-relaxed text-lg pb-12">
        <p>
          Welcome to <strong>ChromaFall</strong>, the ultimate modern block-puzzle experience designed for both desktop and casual mobile gamers. Whether you are a lifelong fan of retro puzzle games or a newcomer looking for a quick brain-training session, ChromaFall serves up the classic falling-block mechanic with stunning neon aesthetics, responsive controls, and challenging scalable levels.
        </p>

        <h2 className="text-3xl font-semibold text-blue-300 mt-10">Our Mission</h2>
        <p>
          Our mission is to bring a seamless, browser-based gaming experience that requires absolutely no downloads or installations. The world of casual gaming has moved towards instantaneous access, and we built ChromaFall to load instantly on any modern web browser. By combining high-performance React technology with a custom-engineered canvas, we created a game that scales flawlessly across ultra-wide monitors and standard smartphones alike.
        </p>
        <p>
          We genuinely believe that great puzzles sharpen the mind. Playing spatial organization games like ChromaFall has been shown to improve critical thinking, enhance spatial awareness, and strengthen pattern recognition. Our goal is to revive the classic thrill of falling-block puzzles while injecting it with a stunning modern visual aesthetic and a profoundly smooth, intuitive user interface.
        </p>

        <h2 className="text-3xl font-semibold text-blue-300 mt-10">Detailed Gameplay Guide</h2>
        <p>
          Getting started in ChromaFall is simple, but achieving a high score requires strategy, foresight, and lightning-fast reflexes. Below is a comprehensive guide on how the mechanics operate and how you can maximize your gameplay.
        </p>
        
        <h3 className="text-xl font-semibold text-cyan-200 mt-6">Core Mechanics</h3>
        <p>
          The primary objective is to strategically place multi-colored falling blocks—often referred to as tetrominoes—into a grid. When an entire horizontal line is filled with blocks, that line will clear, giving you points and freeing up grid space. If the blocks stack all the way to the top of the screen, the game is over.
        </p>

        <h3 className="text-xl font-semibold text-cyan-200 mt-6">Input Controls</h3>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Keyboard (Desktop):</strong> Use your left and right Arrow Keys (or A / D keys) to shift the actively falling piece horizontally.</li>
          <li><strong>Rotation:</strong> Press the Up Arrow or the Spacebar to rotate the block 90 degrees clockwise. This allows you to fit pieces into tricky gaps.</li>
          <li><strong>Fast Drop:</strong> Press the Down Arrow (or the S key) to accelerate the falling speed of the block. This is crucial when playing at faster speeds where waiting is not an option.</li>
          <li><strong>Touch Commands (Mobile):</strong> Swipe left or right on your screen to move the piece. Tap to rotate, and swipe downwards quickly to fast-drop the piece into place.</li>
        </ul>

        <h3 className="text-xl font-semibold text-cyan-200 mt-6">Dynamic Difficulty & Progression</h3>
        <p>
          ChromaFall features a 10-level progression system that actively adapts to your skill. As you clear more lines, your Level increases. Each level increase introduces two major challenges:
          <br /><br />
          <strong>1. Increased Fall Speed:</strong> The blocks will drop considerably faster, reducing your reaction time.
          <br /><strong>2. Expanding Grid Dimensions:</strong> To accommodate the faster speed, the grid occasionally scales up, providing more columns and rows. This unique mechanic distinguishes ChromaFall from traditional puzzle games.
        </p>

        <h2 className="text-3xl font-semibold text-blue-300 mt-10">Tips for High Scores</h2>
        <p>
          Want to dominate the scoreboard? Follow these advanced strategies:
        </p>
        <ul className="list-decimal list-inside space-y-2 ml-4">
          <li><strong>Keep the Board Flat:</strong> Avoid creating tall towers with deep, narrow crevices. Flat surfaces give you more placement options for incoming pieces.</li>
          <li><strong>Look Ahead:</strong> Always pay attention to the colors and shapes you need. Even though there isn't a "next piece" preview yet, planning for all possible shapes ensures you are never caught off guard.</li>
          <li><strong>Patience is Key:</strong> In earlier levels, take your time to build solid structures. Save your line clears for multiple rows at once to maximize your efficiency.</li>
        </ul>

        <h2 className="text-3xl font-semibold text-blue-300 mt-10">Continuous Evolution</h2>
        <p>
          This is only the beginning. Behind the scenes, the development team is actively adding new features to ChromaFall. Upcoming patches will introduce features such as global leaderboards, unique challenge modes containing pre-made puzzles, and an array of unlockable visual themes to customize your neon experience.
        </p>
        <p className="mt-4 text-cyan-400 font-semibold">
          Thank you for playing, and we hope you enjoy clearing lines as much as we enjoyed building the game!
        </p>
      </div>
    </div>
  );
}
