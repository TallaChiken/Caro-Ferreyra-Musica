
import React from 'react';
import { Song } from '../types';

interface SongsProps {
  songs: Song[];
}

const Songs: React.FC<SongsProps> = ({ songs }) => {
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif font-bold mb-4 text-primary">Mis Canciones</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Explora mis últimos lanzamientos y colaboraciones. Música hecha desde el corazón de Córdoba.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {songs.map((song) => {
          const videoId = getYouTubeId(song.youtubeUrl);
          return (
            <div key={song.id} className="bg-white p-4 rounded-3xl shadow-lg border border-slate-100 hover:shadow-2xl transition-shadow">
              <div className="aspect-video mb-4 overflow-hidden rounded-2xl bg-slate-200">
                {videoId ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={song.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <p>Enlace de video no válido</p>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center px-2">
                <h3 className="text-xl font-bold text-slate-800">{song.title}</h3>
                <a 
                  href={song.youtubeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-semibold flex items-center gap-2"
                >
                  Ver en YouTube
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Songs;
