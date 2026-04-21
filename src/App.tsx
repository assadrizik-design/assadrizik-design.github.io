import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, ArrowLeft, ArrowRight, ArrowDown, RotateCcw, Pause, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTetris } from './game/useTetris';
import { COLORS, LEVELS } from './game/constants';
import { audio } from './game/audio';

export default function App() {
  const [muted, setMuted] = useState(false);
  const [adTimeLeft, setAdTimeLeft] = useState(30);
  const [resumeCount, setResumeCount] = useState(3);

  // Trigger AdSense evaluation once the component mounts
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // Ignore errors if the ad is hidden or not configured yet
    }
  }, []);

  const {
    level, state, grid, activeShape, activeType, pos, score, linesCleared, clearingRows, currentConfig,
    initGame, movePlayer, dropPlayer, rotatePlayer, setState
  } = useTetris();

  // Ad Timer Logic
  useEffect(() => {
    let timer: number;
    if (state === 'AD') {
      setAdTimeLeft(30);
      timer = window.setInterval(() => {
        setAdTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setState('GAME_OVER');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [state, setState]);

  // Resume Timer Logic
  useEffect(() => {
    let timer: number;
    if (state === 'RESUMING') {
      setResumeCount(3);
      timer = window.setInterval(() => {
        setResumeCount(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setState('PLAYING');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [state, setState]);

  // Combine static grid with the current falling piece
  const displayGrid = grid.map(row => [...row]);
  
  if (state === 'PLAYING') {
    for (let r = 0; r < activeShape.length; r++) {
      for (let c = 0; c < activeShape[r].length; c++) {
        if (activeShape[r][c] !== 0) {
          const y = pos.y + r;
          const x = pos.x + c;
          if (y >= 0 && y < displayGrid.length && x >= 0 && x < displayGrid[0]?.length) {
            displayGrid[y][x] = activeType;
          }
        }
      }
    }
  }

  const toggleMute = () => {
    audio.setMuted(!muted);
    setMuted(!muted);
  };

  // Start gesture variables
  const touchState = useRef({ startX: 0, startY: 0, lastX: 0, lastY: 0, moved: false });

  const handleTouchStart = (e: React.TouchEvent) => {
    touchState.current = {
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
      lastX: e.touches[0].clientX,
      lastY: e.touches[0].clientY,
      moved: false
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (state !== 'PLAYING') return;
    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;
    const dx = touchState.current.lastX - x;
    const dy = touchState.current.lastY - y;

    // Threshold for swipe
    if (Math.abs(dx) > 30 || Math.abs(dy) > 30) {
      touchState.current.moved = true;
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) movePlayer(-1); // Swipe left = decrease x
        else movePlayer(1); // Swipe right = increase x
        touchState.current.lastX = x;
        touchState.current.lastY = y;
      } else {
        if (dy < -40) {
          dropPlayer(true); // Swipe down hard drop
          touchState.current.lastY = y + 1000; // prevent further triggers
        } else if (dy < 0) {
          dropPlayer(false); // soft drop
          touchState.current.lastY = y;
        }
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (state !== 'PLAYING') return;
    if (!touchState.current.moved) {
      rotatePlayer(); // Tap to rotate
    }
  };

  useEffect(() => {
    // Attempt to init audio interactively to get past browser restrictions
    const initAudio = () => {
       audio.init();
       window.removeEventListener('click', initAudio);
       window.removeEventListener('touchstart', initAudio);
    };
    window.addEventListener('click', initAudio);
    window.addEventListener('touchstart', initAudio);
    return () => {
       window.removeEventListener('click', initAudio);
       window.removeEventListener('touchstart', initAudio);
    }
  }, []);

  return (
    <div className="h-full flex-1 tetris-bg text-white flex flex-col font-sans select-none overflow-hidden touch-none" dir="ltr">
      
      {/* Header */}
      <header className="p-4 flex justify-between items-center bg-black/30 backdrop-blur-md relative z-10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          ChromaFall
        </h1>
        <div className="flex items-center gap-3">
          {(state === 'PLAYING' || state === 'PAUSED' || state === 'RESUMING') && (
            <button 
              onClick={() => {
                if (state === 'PLAYING') setState('PAUSED');
                else if (state === 'PAUSED') setState('RESUMING');
              }} 
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
            >
              {state === 'PAUSED' || state === 'RESUMING' ? <Play size={24} /> : <Pause size={24} />}
            </button>
          )}
          <button 
            onClick={toggleMute} 
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
          >
            {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main 
        className="flex-1 flex flex-col lg:flex-row items-center lg:items-stretch justify-center p-2 sm:p-4 gap-4 sm:gap-8 max-w-7xl mx-auto w-full min-h-0 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        
        {/* Game Details Sidebar (Score, Level) - Hidden on Level 1 */}
        {state !== 'TUTORIAL' && (
          <div className="flex flex-row lg:flex-col gap-2 lg:gap-5 w-full lg:w-[250px] justify-between lg:justify-center order-2 lg:order-1 items-stretch z-10 text-left shrink-0">
            <div className="bg-white/5 border border-white/10 p-2 lg:p-5 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-center gap-1 lg:gap-2 flex-1 relative overflow-hidden">
               <div className="text-[10px] lg:text-xs uppercase opacity-60 tracking-wider">Level</div>
               <div className="text-2xl sm:text-5xl font-black text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">{String(level).padStart(2, '0')}</div>
               {level < 10 ? (
                 <div className="hidden lg:block text-[10px] uppercase opacity-60 tracking-wider mt-2">Objective Level {level + 1}</div>
               ) : (
                 <div className="hidden lg:block text-[10px] uppercase opacity-80 tracking-wider mt-2 text-yellow-500 font-bold">MAX SPEED</div>
               )}
            </div>
            <div className="bg-white/5 border border-white/10 p-2 lg:p-5 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-center flex-1">
               <div className="text-[10px] lg:text-xs uppercase opacity-60 tracking-wider mb-1">Score</div>
               <div className="text-lg sm:text-2xl font-bold font-mono">{score.toLocaleString()}</div>
            </div>
            <div className="bg-white/5 border border-white/10 p-2 lg:p-5 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-center flex-[1.5]">
               <div className="text-[10px] lg:text-xs uppercase opacity-60 tracking-wider mb-1">Lines</div>
               <div className="text-sm sm:text-lg font-bold font-mono">
                  {level < 10 
                    ? `${Math.max(0, linesCleared - (level > 1 ? LEVELS[level - 2].linesToNext : 0))} / ${currentConfig.linesToNext - (level > 1 ? LEVELS[level - 2].linesToNext : 0)}`
                    : linesCleared
                  }
               </div>
            </div>
          </div>
        )}

        {/* Game Board Container */}
        <div className="relative order-1 lg:order-2 flex-1 w-full min-h-[50vh] lg:min-h-0 min-w-0 flex items-center justify-center p-0 lg:p-2 bg-black/20 lg:bg-transparent rounded-xl overflow-hidden">
          {/* Centered Absolute Wrapper ensures perfect aspect ratio without breaking layout flow */}
          <div 
             className="absolute m-auto top-2 bottom-2 left-2 right-2 flex items-center justify-center"
             style={{
               aspectRatio: `${currentConfig.cols} / ${currentConfig.rows}`,
               maxWidth: 'calc(100% - 1rem)',
               maxHeight: 'calc(100% - 1rem)',
               height: 'auto',
               width: 'auto'
             }}
          >
            <AnimatePresence mode="wait">
            {state === 'TUTORIAL' && (
              <motion.div 
                key="tutorial"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -50 }}
                className="absolute inset-0 z-50 flex items-center justify-center max-w-sm mx-auto"
              >
                <div className="bg-black/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl text-left leading-relaxed w-full">
                  <h2 className="text-3xl font-bold mb-4 text-cyan-400">Welcome!</h2>
                  <div className="space-y-4 text-gray-200 text-sm sm:text-base">
                    <p>Arrange the falling blocks to form complete lines.</p>
                    <p>When a line is full, it clears out and you get points.</p>
                    <p className="font-semibold text-yellow-400">Levels 1 to 10:</p>
                    <p>Drop speed increases and the board gets bigger!</p>
                    <div className="bg-white/5 rounded-lg p-3 text-left">
                      <h4 className="font-bold text-blue-300 mb-2">Controls:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li><strong>Arrows or (A,D):</strong> Move left/right</li>
                        <li><strong>Down or (S):</strong> Super fast drop!</li>
                        <li><strong>Up or Space:</strong> Rotate</li>
                        <li><strong>Touch / Swipe:</strong> Mobile gestures</li>
                      </ul>
                    </div>
                  </div>
                  <button 
                    onClick={() => initGame(1)}
                    className="mt-6 w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-bold rounded-xl shadow-lg transform transition active:scale-95 cursor-pointer"
                  >
                    Start Game
                  </button>
                </div>
              </motion.div>
            )}

            {state === 'LEVEL_UP' && (
              <motion.div 
                key="levelup"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center z-50 bg-black/80 backdrop-blur-sm rounded-xl"
              >
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-green-400 mb-2">Level Cleared!</h2>
                  <p className="text-xl text-white mb-6">You passed level {level}</p>
                  <button 
                    onClick={() => initGame(level + 1)}
                    className="px-6 py-3 bg-green-500 hover:bg-green-400 font-bold rounded-xl shadow-lg transition active:scale-95 cursor-pointer"
                  >
                    Start Level {level + 1}
                  </button>
                </div>
              </motion.div>
            )}

            {state === 'AD' && (
              <motion.div 
                key="ad"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black flex flex-col"
              >
                <div className="absolute top-6 left-6 z-[101]">
                  {30 - adTimeLeft >= 10 ? (
                    <button 
                      onClick={() => setState('GAME_OVER')}
                      className="bg-white/20 hover:bg-white/40 text-white px-5 py-3 rounded-full backdrop-blur-md transition border border-white/40 flex items-center gap-2 cursor-pointer font-bold shadow-lg"
                    >
                      Skip Ad ⏭
                    </button>
                  ) : (
                    <div className="bg-black/60 text-white px-5 py-3 rounded-full backdrop-blur-md flex items-center gap-2 border border-white/10 text-sm font-medium">
                      You can skip in {10 - (30 - adTimeLeft)}s
                    </div>
                  )}
                </div>
                <div className="absolute top-6 right-6 z-[101]">
                  <div className="bg-black/60 text-white px-5 py-3 rounded-full backdrop-blur-md border border-white/10 text-sm font-medium">
                    Ad closes in {adTimeLeft}s
                  </div>
                </div>
                
                {/* Simulated Video Content */}
                <div className="flex-1 w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-[#0A0A0C]">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-black to-purple-900/40 opacity-70"></div>
                  
                  {/* Mock Ad UI elements */}
                  <div className="z-10 text-center px-4 flex flex-col items-center">
                    <div className="w-24 h-24 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-2xl shadow-[0_0_40px_rgba(37,99,235,0.8)] mb-6 flex items-center justify-center animate-bounce">
                      <span className="text-4xl">💎</span>
                    </div>
                    <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 drop-shadow-md mb-4">
                      Legendary Gems Quest
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
                      Download now and claim 10,000 FREE gems! Join millions of players in the biggest puzzle game of the year.
                    </p>
                  </div>

                  <div className="absolute bottom-16 left-0 right-0 flex justify-center z-10">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 transition-all text-white px-10 py-4 rounded-full font-black text-xl shadow-[0_0_30px_rgba(16,185,129,0.5)] cursor-pointer animate-pulse transform hover:scale-105 border-2 border-green-300/50">
                        Download Now!
                     </div>
                  </div>

                  {/* Decorative animations */}
                  <div className="absolute top-1/4 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>
              </motion.div>
            )}

            {state === 'GAME_OVER' && (
              <motion.div 
                key="gameover"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center z-50 bg-red-900/90 backdrop-blur-md rounded-xl border border-red-500 w-full h-full"
              >
                <div className="text-center p-4">
                  <h2 className="text-4xl font-bold text-white mb-4">GAME OVER</h2>
                  <p className="text-lg text-red-200 mb-6">Final Score: {score}</p>
                  <button 
                    onClick={() => initGame(level)} // Retry same level
                    className="px-6 py-3 bg-white text-red-900 hover:bg-gray-200 font-bold rounded-xl shadow-lg transition active:scale-95 cursor-pointer"
                  >
                    Try Again
                  </button>
                </div>
              </motion.div>
            )}

            {state === 'PAUSED' && (
              <motion.div 
                key="paused"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm rounded-xl w-full h-full"
              >
                <div className="text-center">
                  <h2 className="text-5xl font-bold mb-6 text-white tracking-widest">PAUSED</h2>
                  <button 
                    onClick={() => setState('RESUMING')}
                    className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg transform transition active:scale-95 cursor-pointer text-xl flex items-center justify-center gap-2 mx-auto"
                  >
                    <Play size={24}/> Resume
                  </button>
                </div>
              </motion.div>
            )}

            {state === 'RESUMING' && (
               <motion.div 
                 key="resuming"
                 initial={{ opacity: 0, scale: 1.5 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.5 }}
                 className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm rounded-xl w-full h-full"
               >
                 <motion.h1 
                    key={resumeCount}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.5 }}
                    className="text-9xl font-black text-cyan-400 drop-shadow-[0_0_40px_rgba(34,211,238,0.8)]"
                  >
                    {resumeCount}
                  </motion.h1>
               </motion.div>
            )}
          </AnimatePresence>

          {(state === 'PLAYING' || state === 'LEVEL_UP' || state === 'GAME_OVER' || state === 'PAUSED' || state === 'RESUMING') && (
              <div 
                className="bg-black/90 border-2 sm:border-4 border-[#333] shadow-[0_0_50px_rgba(0,0,255,0.1)] rounded w-full h-full overflow-hidden"
                style={{
                  display: 'grid',
                  gridTemplateRows: `repeat(${currentConfig.rows}, minmax(0, 1fr))`,
                  gridTemplateColumns: `repeat(${currentConfig.cols}, minmax(0, 1fr))`,
                  gap: '1px',
                }}
              >
                {displayGrid.map((row, y) => (
                  row.map((cell, x) => (
                    <div 
                      key={`${y}-${x}`} 
                      className={`
                        box-border w-full h-full
                        ${cell !== 0 ? (COLORS as any)[cell] : 'border-[0.5px] border-white/[0.03]'}
                        ${clearingRows.includes(y) ? 'clearing-row' : ''}
                      `}
                    />
                  ))
                ))}
              </div>
            )}
          </div>
        </div>

      </main>

      {/* Bottom Banner Ad Space */}
      <div className="w-full bg-white/5 border-t border-white/10 p-2 flex justify-center items-center backdrop-blur-md z-20">
        <div className="w-full max-w-[320px] sm:max-w-[728px] min-h-[50px] sm:min-h-[90px] bg-black/40 rounded border border-white/10 flex items-center justify-center relative overflow-hidden group">
          {/* Default Placeholder when ad is not configured (You will replace this when you get your AdSense credentials) */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[100%] group-hover:animate-shimmer"></div>
          <p className="text-gray-400 text-xs sm:text-sm font-medium tracking-widest text-center px-4 absolute z-0 pointer-events-none">
             ADVERTISEMENT SPACE
          </p>
          
          {/* ACTUAL GOOGLE ADSENSE CODE */}
          {/* Instructions: 
              1. Remove "hidden" class from the <ins> tag below when you are ready.
              2. Change data-ad-client to your publisher ID (e.g., ca-pub-123456789).
              3. Change data-ad-slot to your ad unit slot ID. 
          */}
          <ins className="adsbygoogle hidden z-10 w-full h-[50px] sm:h-[90px]"
               style={{ display: 'block' }}
               data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
               data-ad-slot="YYYYYYYYYY"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>
      </div>
    </div>
  );
}
