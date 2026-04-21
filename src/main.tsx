import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import App from './App.tsx';
import About from './About.tsx';
import Contact from './Contact.tsx';
import Privacy from './Privacy.tsx';
import './index.css';

function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0C]">
      {/* Top Navigation for SEO and AdSense */}
      <nav className="w-full bg-black/60 border-b border-white/10 p-4 flex justify-center gap-6 text-sm text-gray-400 z-50">
        <Link to="/" className="hover:text-white transition">Play Game</Link>
        <Link to="/about" className="hover:text-white transition">About</Link>
        <Link to="/contact" className="hover:text-white transition">Contact</Link>
        <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
      </nav>

      {/* Main Content Render */}
      <div className="flex-1 flex flex-col relative w-full h-full">
         <Routes>
           <Route path="/" element={<App />} />
           <Route path="/about" element={<About />} />
           <Route path="/contact" element={<Contact />} />
           <Route path="/privacy" element={<Privacy />} />
         </Routes>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <RootLayout />
    </HashRouter>
  </StrictMode>,
);
