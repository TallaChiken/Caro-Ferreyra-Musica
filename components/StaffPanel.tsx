
import React, { useState } from 'react';
import { AppData, Song, Presentation } from '../types';
import { INITIAL_DATA } from '../constants';

interface StaffPanelProps {
  data: AppData;
  onUpdate: (data: AppData) => void;
  onExit: () => void;
}

const StaffPanel: React.FC<StaffPanelProps> = ({ data, onUpdate, onExit }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ user: '', password: '' });
  const [error, setError] = useState('');

  const [editData, setEditData] = useState<AppData>(data);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.user === 'admin' && credentials.password === 'carolina2024') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  const handleSave = () => {
    onUpdate(editData);
    alert('Configuración guardada en tu navegador. Recuerda exportar el JSON para hacerlo permanente.');
  };

  const handleExportJSON = () => {
    const jsonString = JSON.stringify(editData, null, 2);
    navigator.clipboard.writeText(jsonString).then(() => {
      alert('¡Código de configuración copiado al portapapeles! Pegalo en el chat para que el programador actualice el sitio de forma global.');
    }).catch(err => {
      console.error('Error al copiar:', err);
      alert('No se pudo copiar automáticamente. Puedes copiarlo manualmente desde la consola del navegador.');
      console.log(jsonString);
    });
  };

  const handleReset = () => {
    if (confirm('¿Estás seguro de que quieres restablecer todos los valores originales? Se perderán tus cambios locales.')) {
      setEditData(INITIAL_DATA);
      onUpdate(INITIAL_DATA);
      alert('Valores restablecidos localmente.');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-serif font-bold text-center mb-8 text-slate-800">Acceso Staff</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Usuario</label>
              <input 
                type="text" 
                className="w-full border p-3 rounded-lg"
                value={credentials.user}
                onChange={(e) => setCredentials({...credentials, user: e.target.value})}
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Contraseña</label>
              <input 
                type="password" 
                className="w-full border p-3 rounded-lg"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:brightness-90">
              Ingresar
            </button>
            <button 
              type="button"
              onClick={onExit}
              className="w-full text-slate-400 text-sm hover:underline mt-4"
            >
              Volver al sitio público
            </button>
          </form>
          <p className="mt-8 text-xs text-slate-400 text-center">
            Demo credentials: admin / carolina2024
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <header className="bg-white border-b sticky top-0 z-10 px-6 py-4 flex flex-wrap justify-between items-center shadow-sm gap-4">
        <h1 className="text-2xl font-serif font-bold text-primary">Panel de Administración</h1>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={handleExportJSON}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
            Exportar para Global
          </button>
          <button 
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition-colors"
          >
            Guardar Local
          </button>
          <button 
            onClick={onExit}
            className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold hover:bg-slate-300 transition-colors"
          >
            Ver Sitio
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-12">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-blue-700 text-sm mb-6">
          <p className="font-bold">💡 Nota sobre permanencia:</p>
          <p>Los cambios que hagas aquí se guardan solo en este navegador. Para que todo el mundo los vea, usa el botón <strong>"Exportar para Global"</strong> y envíame el código resultante.</p>
        </div>

        <div className="flex justify-end">
          <button 
            onClick={handleReset}
            className="text-xs bg-slate-200 text-slate-500 px-3 py-1 rounded hover:bg-red-100 hover:text-red-600 transition-all uppercase tracking-wider font-bold"
          >
            Restablecer valores originales
          </button>
        </div>

        {/* Imágenes del Sitio */}
        <section className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Gestión de Imágenes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-slate-50 rounded-lg border">
              <label className="block text-sm font-bold mb-1">Portada Principal (PC)</label>
              <input 
                type="text" 
                className="w-full border p-2 rounded text-sm mb-4"
                value={editData.heroImageUrl}
                onChange={(e) => setEditData({...editData, heroImageUrl: e.target.value})}
              />
              <label className="block text-sm font-bold mb-1">Portada Móvil</label>
              <input 
                type="text" 
                className="w-full border p-2 rounded text-sm"
                value={editData.heroImageUrlSecondary}
                onChange={(e) => setEditData({...editData, heroImageUrlSecondary: e.target.value})}
              />
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border">
              <label className="block text-sm font-bold mb-1">Imagen "Sobre Mí"</label>
              <input 
                type="text" 
                className="w-full border p-2 rounded text-sm mb-4"
                value={editData.aboutImageUrl}
                onChange={(e) => setEditData({...editData, aboutImageUrl: e.target.value})}
              />
              <label className="block text-sm font-bold mb-1">Banner "Shows"</label>
              <input 
                type="text" 
                className="w-full border p-2 rounded text-sm"
                value={editData.presentationsImageUrl}
                onChange={(e) => setEditData({...editData, presentationsImageUrl: e.target.value})}
              />
            </div>
          </div>
        </section>

        {/* Color Principal */}
        <section className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Color Principal</h2>
          <div className="flex items-center gap-4">
            <input 
              type="color" 
              className="w-12 h-12 rounded cursor-pointer border-0"
              value={editData.primaryColor}
              onChange={(e) => setEditData({...editData, primaryColor: e.target.value})}
            />
            <span className="text-slate-500 font-mono uppercase font-bold">{editData.primaryColor}</span>
          </div>
        </section>

        {/* Sobre Mí */}
        <section className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Texto Biografía</h2>
          <textarea 
            className="w-full border p-4 rounded-lg h-48 focus:ring-2 focus:ring-primary outline-none"
            value={editData.aboutText}
            onChange={(e) => setEditData({...editData, aboutText: e.target.value})}
          />
        </section>

        {/* Canciones */}
        <section className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Canciones</h2>
            <button 
              onClick={() => {
                const newSong: Song = { id: Date.now().toString(), title: 'Nueva Canción', youtubeUrl: '' };
                setEditData({...editData, songs: [...editData.songs, newSong]});
              }}
              className="text-primary font-bold hover:underline"
            >
              + Agregar
            </button>
          </div>
          <div className="space-y-4">
            {editData.songs.map((song, index) => (
              <div key={song.id} className="flex flex-col sm:flex-row gap-2 p-3 bg-slate-50 rounded-lg border">
                <input 
                  type="text" 
                  placeholder="Título"
                  className="flex-1 border p-2 rounded text-sm"
                  value={song.title}
                  onChange={(e) => {
                    const newSongs = [...editData.songs];
                    newSongs[index].title = e.target.value;
                    setEditData({...editData, songs: newSongs});
                  }}
                />
                <input 
                  type="text" 
                  placeholder="URL YouTube"
                  className="flex-1 border p-2 rounded text-sm"
                  value={song.youtubeUrl}
                  onChange={(e) => {
                    const newSongs = [...editData.songs];
                    newSongs[index].youtubeUrl = e.target.value;
                    setEditData({...editData, songs: newSongs});
                  }}
                />
                <button 
                  onClick={() => {
                    setEditData({...editData, songs: editData.songs.filter(s => s.id !== song.id)});
                  }}
                  className="text-red-500 p-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Presentaciones */}
        <section className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Agenda de Shows</h2>
            <button 
              onClick={() => {
                const newPres: Presentation = { 
                  id: Date.now().toString(), 
                  date: new Date().toISOString().split('T')[0], 
                  location: 'Ciudad', 
                  venue: 'Lugar', 
                  isPast: false 
                };
                setEditData({...editData, presentations: [...editData.presentations, newPres]});
              }}
              className="text-primary font-bold hover:underline"
            >
              + Agregar
            </button>
          </div>
          <div className="space-y-4">
            {editData.presentations.map((pres, index) => (
              <div key={pres.id} className="grid grid-cols-1 sm:grid-cols-5 gap-2 p-3 bg-slate-50 rounded-lg border items-center">
                <input 
                  type="date" 
                  className="border p-2 rounded text-sm sm:col-span-1"
                  value={pres.date}
                  onChange={(e) => {
                    const newPres = [...editData.presentations];
                    newPres[index].date = e.target.value;
                    setEditData({...editData, presentations: newPres});
                  }}
                />
                <input 
                  type="text" 
                  placeholder="Lugar"
                  className="border p-2 rounded text-sm sm:col-span-1"
                  value={pres.venue}
                  onChange={(e) => {
                    const newPres = [...editData.presentations];
                    newPres[index].venue = e.target.value;
                    setEditData({...editData, presentations: newPres});
                  }}
                />
                <input 
                  type="text" 
                  placeholder="Ciudad"
                  className="border p-2 rounded text-sm sm:col-span-1"
                  value={pres.location}
                  onChange={(e) => {
                    const newPres = [...editData.presentations];
                    newPres[index].location = e.target.value;
                    setEditData({...editData, presentations: newPres});
                  }}
                />
                <select 
                  className="border p-2 rounded text-sm sm:col-span-1"
                  value={pres.isPast ? 'past' : 'upcoming'}
                  onChange={(e) => {
                    const newPres = [...editData.presentations];
                    newPres[index].isPast = e.target.value === 'past';
                    setEditData({...editData, presentations: newPres});
                  }}
                >
                  <option value="upcoming">Próximo</option>
                  <option value="past">Pasado</option>
                </select>
                <button 
                  onClick={() => {
                    setEditData({...editData, presentations: editData.presentations.filter(p => p.id !== pres.id)});
                  }}
                  className="text-red-500 flex justify-center"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Contacto & Redes */}
        <section className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Contacto y Redes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Email</label>
              <input 
                type="email" 
                className="w-full border p-2 rounded text-sm"
                value={editData.contact.email}
                onChange={(e) => setEditData({...editData, contact: {...editData.contact, email: e.target.value}})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Teléfono Público</label>
              <input 
                type="text" 
                className="w-full border p-2 rounded text-sm"
                value={editData.contact.phone}
                onChange={(e) => setEditData({...editData, contact: {...editData.contact, phone: e.target.value}})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Instagram (usuario)</label>
              <input 
                type="text" 
                className="w-full border p-2 rounded text-sm"
                value={editData.contact.instagram}
                onChange={(e) => setEditData({...editData, contact: {...editData.contact, instagram: e.target.value}})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">WhatsApp (num solo)</label>
              <input 
                type="text" 
                className="w-full border p-2 rounded text-sm"
                value={editData.contact.whatsapp}
                onChange={(e) => setEditData({...editData, contact: {...editData.contact, whatsapp: e.target.value}})}
              />
            </div>
          </div>
        </section>

        <div className="text-center pt-10">
           <button 
            onClick={handleSave}
            className="bg-primary text-white px-12 py-4 rounded-xl font-bold text-xl hover:scale-105 transition-transform shadow-lg"
          >
            Guardar Cambios Locales
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffPanel;
