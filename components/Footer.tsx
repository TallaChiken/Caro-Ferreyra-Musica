
import React from 'react';
import { ContactInfo } from '../types';

interface FooterProps {
  contact: ContactInfo;
}

const Footer: React.FC<FooterProps> = ({ contact }) => {
  return (
    <footer className="bg-slate-950 text-slate-500 py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-serif text-2xl text-white mb-4">Carolina Ferreyra</p>
        <p className="mb-6">Ciudad de Córdoba, Argentina</p>
        <div className="flex justify-center space-x-6 mb-8 text-slate-400">
          <a href={`https://instagram.com/${contact.instagram}`} className="hover:text-primary transition-colors">Instagram</a>
          <a href={`https://facebook.com/${contact.facebook}`} className="hover:text-primary transition-colors">Facebook</a>
          <a href="#inicio" className="hover:text-primary transition-colors">Volver arriba</a>
        </div>
        <div className="text-sm border-t border-slate-900 pt-8">
          © {new Date().getFullYear()} Carolina Ferreyra. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
