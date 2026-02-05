
import React from 'react';

interface AboutProps {
  text: string;
  imageUrl: string;
}

const About: React.FC<AboutProps> = ({ text, imageUrl }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative group">
          <div className="absolute -inset-4 bg-primary/20 rounded-2xl transform rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
          <img 
            src={imageUrl} 
            alt="Carolina Ferreyra" 
            className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[4/5]"
          />
        </div>
        <div>
          <h2 className="text-4xl font-serif font-bold mb-6 text-primary">Sobre Mí</h2>
          <div className="space-y-4 text-lg text-slate-700 leading-relaxed italic">
            {text.split('\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <div className="mt-8 flex gap-4">
            <div className="p-4 bg-slate-50 rounded-lg border-l-4 border-primary">
              <span className="block text-2xl font-bold text-primary">4+</span>
              <span className="text-sm text-slate-500 uppercase tracking-tighter">Años de Trayectoria</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border-l-4 border-primary">
              <span className="block text-2xl font-bold text-primary">12</span>
              <span className="text-sm text-slate-500 uppercase tracking-tighter">Shows en Vivo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
