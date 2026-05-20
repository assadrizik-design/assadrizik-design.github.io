import {StrictMode, useState} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import About from './About.tsx';
import Contact from './Contact.tsx';
import Privacy from './Privacy.tsx';
import './index.css';

function RootLayout() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'contact' | 'privacy'>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <App />;
      case 'about': return <About />;
      case 'contact': return <Contact />;
      case 'privacy': return <Privacy />;
      default: return <App />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#0A0A0C]">
      {/* Top Navigation for SEO and AdSense */}
      <nav className="w-full bg-black/60 border-b border-white/10 p-4 flex justify-center gap-6 text-sm text-gray-400 z-50 shrink-0">
        <button onClick={() => setCurrentPage('home')} className={`hover:text-white transition ${currentPage === 'home' ? 'text-cyan-400' : ''}`}>Play Game</button>
        <button onClick={() => setCurrentPage('about')} className={`hover:text-white transition ${currentPage === 'about' ? 'text-cyan-400' : ''}`}>About</button>
        <button onClick={() => setCurrentPage('contact')} className={`hover:text-white transition ${currentPage === 'contact' ? 'text-cyan-400' : ''}`}>Contact</button>
        <button onClick={() => setCurrentPage('privacy')} className={`hover:text-white transition ${currentPage === 'privacy' ? 'text-cyan-400' : ''}`}>Privacy Policy</button>
      </nav>

      {/* Main Content Render */}
      <div className="flex-1 flex flex-col relative w-full overflow-y-auto overflow-x-hidden">
         {renderPage()}
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootLayout />
  </StrictMode>,
);
