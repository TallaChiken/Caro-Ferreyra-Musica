
import React from 'react';

interface HeroProps {
  imageUrl: string;
  mobileImageUrl?: string;
}

const Hero: React.FC<HeroProps> = ({ imageUrl, mobileImageUrl }) => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    window.location.hash = id;
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Generamos un estilo dinámico para manejar las dos imágenes
  const backgroundStyle = {
    '--bg-desktop': `url('${imageUrl}')`,
    '--bg-mobile': `url('${mobileImageUrl || imageUrl}')`,
  } as React.CSSProperties;

  return (
    <div className="relative h-[85vh] flex items-center justify-center overflow-hidden">
      <style>
        {`
          .hero-bg {
            background-image: var(--bg-mobile);
          }
          @media (min-width: 768px) {
            .hero-bg {
              background-image: var(--bg-desktop);
            }
          }
        `}
      </style>
      <div 
        className="hero-bg absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={backgroundStyle}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-8xl font-serif text-white mb-4 drop-shadow-lg">
          Carolina Ferreyra
        </h1>
        <p className="text-xl md:text-2xl text-white/90 font-light tracking-widest uppercase mb-8 drop-shadow-md">
          La voz de Córdoba
        </p>
        <a 
          href="#canciones" 
          onClick={(e) => scrollToSection(e, '#canciones')}
          className="inline-block bg-primary text-white px-10 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-2xl"
        >
          Escuchar Música
        </a>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <a 
          href="#sobre-mi" 
          onClick={(e) => scrollToSection(e, '#sobre-mi')}
          className="text-white opacity-80 hover:opacity-100"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Hero;
