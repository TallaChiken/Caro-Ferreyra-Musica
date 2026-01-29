
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
    alert('Configuración guardada correctamente.');
  };

  const handleReset = () => {
    if (confirm('¿Estás seguro de que quieres restablecer todos los valores originales? Se perderán los cambios que no hayas guardado.')) {
      setEditData(INITIAL_DATA);
      onUpdate(INITIAL_DATA);
      alert('Valores restablecidos. No olvides presionar "Guardar Todo" si quieres que este cambio sea permanente.');
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
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b sticky top-0 z-10 px-6 py-4 flex justify-between items-center shadow-sm">
        <h1 className="text-2xl font-serif font-bold text-primary">Panel de Administración</h1>
        <div className="flex gap-4">
          <button 
            onClick={handleSave}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition-colors"
          >
            Guardar Todo
          </button>
          <button 
            onClick={onExit}
            className="bg-slate-200 text-slate-700 px-6 py-2 rounded-lg font-bold hover:bg-slate-300 transition-colors"
          >
            Salir
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-8 space-y-12">
        {/* Acciones Rápidas */}
        <div className="flex justify-end">
          <button 
            onClick={handleReset}
            className="text-xs bg-slate-200 text-slate-500 px-3 py-1 rounded hover:bg-red-100 hover:text-red-600 transition-all uppercase tracking-wider font-bold"
          >
            Restablecer valores por defecto
          </button>
        </div>

        {/* Imágenes del Sitio */}
        <section className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Gestión de Imágenes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-slate-50 rounded-lg border">
              <label className="block text-sm font-bold mb-1">Portada Principal (Hero - PC)</label>
              <p className="text-xs text-slate-500 mb-2 italic">Ej: /Images/hero.jpg</p>
              <input 
                type="text" 
                placeholder="Link imagen PC"
                className="w-full border p-2 rounded text-sm mb-4"
                value={editData.heroImageUrl}
                onChange={(e) => setEditData({...editData, heroImageUrl: e.target.value})}
              />
              <label className="block text-sm font-bold mb-1">Portada Móvil (Vertical)</label>
              <p className="text-xs text-slate-500 mb-2 italic">Ej: /Images/hero-mobile.jpg</p>
              <input 
                type="text" 
                placeholder="Link imagen Móvil"
                className="w-full border p-2 rounded text-sm"
                value={editData.heroImageUrlSecondary}
                onChange={(e) => setEditData({...editData, heroImageUrlSecondary: e.target.value})}
              />
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border">
              <label className="block text-sm font-bold mb-1">Imagen "Sobre Mí"</label>
              <p className="text-xs text-slate-500 mb-2 italic">Ej: /Images/sobre-mi.jpg</p>
              <input 
                type="text" 
                placeholder="Link imagen Sobre Mí"
                className="w-full border p-2 rounded text-sm mb-4"
                value={editData.aboutImageUrl}
                onChange={(e) => setEditData({...editData, aboutImageUrl: e.target.value})}
              />
              <label className="block text-sm font-bold mb-1">Banner "Presentaciones"</label>
              <p className="text-xs text-slate-500 mb-2 italic">Ej: /Images/banner-shows.jpg</p>
              <input 
                type="text" 
                placeholder="Link imagen Presentaciones"
                className="w-full border p-2 rounded text-sm"
                value={editData.presentationsImageUrl}
                onChange={(e) => setEditData({...editData, presentationsImageUrl: e.target.value})}
              />
            </div>
          </div>
        </section>

        {/* Color Principal */}
        <section className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Color Principal del Sitio</h2>
          <div className="flex items-center gap-4">
            <input 
              type="color" 
              className="w-16 h-16 rounded cursor-pointer"
              value={editData.primaryColor}
              onChange={(e) => setEditData({...editData, primaryColor: e.target.value})}
            />
            <span className="text-slate-500 font-mono uppercase">{editData.primaryColor}</span>
          </div>
        </section>

        {/* Sobre Mí */}
        <section className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Texto "Sobre Mí"</h2>
          <textarea 
            className="w-full border p-4 rounded-lg h-48 focus:ring-2 focus:ring-primary outline-none"
            value={editData.aboutText}
            onChange={(e) => setEditData({...editData, aboutText: e.target.value})}
          />
        </section>

        {/* Canciones */}
        <section className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Gestión de Canciones</h2>
            <button 
              onClick={() => {
                const newSong: Song = { id: Date.now().toString(), title: 'Nueva Canción', youtubeUrl: '' };
                setEditData({...editData, songs: [...editData.songs, newSong]});
              }}
              className="text-primary font-bold hover:underline"
            >
              + Agregar Canción
            </button>
          </div>
          <div className="space-y-4">
            {editData.songs.map((song, index) => (
              <div key={song.id} className="flex flex-col sm:flex-row gap-4 p-4 bg-slate-50 rounded-lg border">
                <input 
                  type="text" 
                  placeholder="Título"
                  className="flex-1 border p-2 rounded"
                  value={song.title}
                  onChange={(e) => {
                    const newSongs = [...editData.songs];
                    newSongs[index].title = e.target.value;
                    setEditData({...editData, songs: newSongs});
                  }}
                />
                <input 
                  type="text" 
                  placeholder="Link de YouTube"
                  className="flex-1 border p-2 rounded"
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
                  className="text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Presentaciones */}
        <section className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Gestión de Presentaciones</h2>
            <button 
              onClick={() => {
                const newPres: Presentation = { 
                  id: Date.now().toString(), 
                  date: new Date().toISOString().split('T')[0], 
                  location: 'Ciudad, Provincia', 
                  venue: 'Nombre del Lugar', 
                  isPast: false 
                };
                setEditData({...editData, presentations: [...editData.presentations, newPres]});
              }}
              className="text-primary font-bold hover:underline"
            >
              + Agregar Show
            </button>
          </div>
          <div className="space-y-4">
            {editData.presentations.map((pres, index) => (
              <div key={pres.id} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 p-4 bg-slate-50 rounded-lg border">
                <input 
                  type="date" 
                  className="border p-2 rounded"
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
                  className="border p-2 rounded"
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
                  className="border p-2 rounded"
                  value={pres.location}
                  onChange={(e) => {
                    const newPres = [...editData.presentations];
                    newPres[index].location = e.target.value;
                    setEditData({...editData, presentations: newPres});
                  }}
                />
                <select 
                  className="border p-2 rounded"
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
                  className="text-red-500 hover:text-red-700 text-sm font-bold"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Contacto & Redes */}
        <section className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Información de Contacto y Redes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-1">Email Público</label>
              <input 
                type="email" 
                className="w-full border p-2 rounded"
                value={editData.contact.email}
                onChange={(e) => setEditData({...editData, contact: {...editData.contact, email: e.target.value}})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Teléfono (Texto)</label>
              <input 
                type="text" 
                className="w-full border p-2 rounded"
                value={editData.contact.phone}
                onChange={(e) => setEditData({...editData, contact: {...editData.contact, phone: e.target.value}})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Usuario Instagram (sin @)</label>
              <input 
                type="text" 
                className="w-full border p-2 rounded"
                value={editData.contact.instagram}
                onChange={(e) => setEditData({...editData, contact: {...editData.contact, instagram: e.target.value}})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Facebook (slug)</label>
              <input 
                type="text" 
                className="w-full border p-2 rounded"
                value={editData.contact.facebook}
                onChange={(e) => setEditData({...editData, contact: {...editData.contact, facebook: e.target.value}})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Número WhatsApp (sin +)</label>
              <input 
                type="text" 
                className="w-full border p-2 rounded"
                value={editData.contact.whatsapp}
                onChange={(e) => setEditData({...editData, contact: {...editData.contact, whatsapp: e.target.value}})}
              />
            </div>
            <div className="md:col-span-2 p-4 bg-slate-50 border rounded-lg">
              <label className="block text-sm font-bold mb-1 text-primary">Formspree ID (para el formulario)</label>
              <p className="text-xs text-slate-500 mb-2">
                Obtené este ID en formspree.io para que los mensajes lleguen a tu correo. 
                Ej: si tu URL es https://formspree.io/f/mjvgzjwv, el ID es "mjvgzjwv".
              </p>
              <input 
                type="text" 
                placeholder="mjvgzjwv"
                className="w-full border p-2 rounded font-mono"
                value={editData.contact.formspreeId}
                onChange={(e) => setEditData({...editData, contact: {...editData.contact, formspreeId: e.target.value}})}
              />
            </div>
          </div>
        </section>

        <div className="pb-20 text-center">
           <button 
            onClick={handleSave}
            className="bg-primary text-white px-12 py-4 rounded-xl font-bold text-xl hover:scale-105 transition-transform shadow-lg"
          >
            Guardar Todos los Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffPanel;
