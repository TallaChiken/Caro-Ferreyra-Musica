
import React, { useState, useEffect } from 'react';
import { AppData } from './types.ts';
import { INITIAL_DATA } from './constants.ts';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import About from './components/About.tsx';
import Songs from './components/Songs.tsx';
import Presentations from './components/Presentations.tsx';
import Contact from './components/Contact.tsx';
import StaffPanel from './components/StaffPanel.tsx';
import Footer from './components/Footer.tsx';

const App: React.FC = () => {
  const [data, setData] = useState<AppData>(() => {
    try {
      const saved = localStorage.getItem('carolina_ferreyra_data');
      return saved ? JSON.parse(saved) : INITIAL_DATA;
    } catch (e) {
      console.error("Error al acceder a localStorage:", e);
      return INITIAL_DATA;
    }
  });

  const [currentHash, setCurrentHash] = useState(window.location.hash || '#inicio');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#inicio';
      setCurrentHash(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('carolina_ferreyra_data', JSON.stringify(data));
    } catch (e) {
      console.error("Error al guardar en localStorage:", e);
    }
    document.documentElement.style.setProperty('--primary-color', data.primaryColor);
  }, [data]);

  const handleUpdateData = (newData: AppData) => {
    setData(newData);
  };

  const renderContent = () => {
    if (currentHash === '#staff') {
      return (
        <StaffPanel 
          data={data} 
          onUpdate={handleUpdateData} 
          onExit={() => {
            window.location.hash = '#inicio';
          }}
        />
      );
    }

    return (
      <main>
        <section id="inicio">
          <Hero imageUrl={data.heroImageUrl} />
        </section>
        <section id="sobre-mi" className="py-20 bg-white">
          <About text={data.aboutText} imageUrl={data.aboutImageUrl} />
        </section>
        <section id="canciones" className="py-20 bg-slate-50">
          <Songs songs={data.songs} />
        </section>
        <section id="presentaciones" className="py-20 bg-white">
          <Presentations presentations={data.presentations} imageUrl={data.presentationsImageUrl} />
        </section>
        <section id="contacto" className="py-20 bg-slate-900 text-white">
          <Contact contact={data.contact} />
        </section>
      </main>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {currentHash !== '#staff' && <Navbar />}
      <div className="flex-grow">
        {renderContent()}
      </div>
      {currentHash !== '#staff' && <Footer contact={data.contact} />}
    </div>
  );
};

export default App;
