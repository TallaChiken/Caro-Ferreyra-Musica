
import React from 'react';
import { Presentation } from '../types';

interface PresentationsProps {
  presentations: Presentation[];
  imageUrl: string;
}

const PresentationCard: React.FC<{ p: Presentation }> = ({ p }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary/30 transition-colors group">
    <div>
      <span className="text-sm font-bold text-primary uppercase tracking-widest block mb-1">
        {new Date(p.date).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}
      </span>
      <h4 className="text-xl font-bold text-slate-800">{p.venue}</h4>
      <p className="text-slate-500">{p.location}</p>
    </div>
    <div className="mt-4 sm:mt-0">
      <button className="px-6 py-2 rounded-full border border-primary text-primary group-hover:bg-primary group-hover:text-white transition-all">
        {p.isPast ? 'Ver detalles' : 'Tickets pronto'}
      </button>
    </div>
  </div>
);

const Presentations: React.FC<PresentationsProps> = ({ presentations, imageUrl }) => {
  const upcoming = presentations.filter(p => !p.isPast).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const past = presentations.filter(p => p.isPast).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-serif font-bold mb-4 text-primary">Mis Presentaciones</h2>
        <p className="text-slate-600">Dónde nos encontramos para compartir la música.</p>
      </div>

      <div className="mb-12 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
        <img 
          src={imageUrl} 
          alt="Banner de presentaciones" 
          className="w-full h-48 md:h-64 object-cover"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">✓</span>
            Próximas Fechas
          </h3>
          <div className="space-y-4">
            {upcoming.length > 0 ? (
              upcoming.map(p => <PresentationCard key={p.id} p={p} />)
            ) : (
              <p className="text-slate-400 italic">No hay próximas presentaciones programadas por ahora.</p>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-sm">↺</span>
            Donde Estuve
          </h3>
          <div className="space-y-4">
            {past.slice(0, 4).map(p => <PresentationCard key={p.id} p={p} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presentations;
