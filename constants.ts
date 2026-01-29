
import { AppData } from './types';

export const INITIAL_DATA: AppData = {
  primaryColor: '#4169E1',
  aboutText: 'Carolina Ferreyra es una apasionada cantante de la Ciudad de Córdoba, Argentina. Con una voz que fusiona la calidez del folklore con la frescura del pop contemporáneo, ha recorrido los escenarios más emblemáticos de la provincia, llevando su mensaje de amor y tradición. Criada en un entorno musical, su arte refleja la esencia del ser cordobés.',
  heroImageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=1920',
  heroImageUrlSecondary: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=1920',
  aboutImageUrl: 'https://picsum.photos/id/64/800/1000',
  presentationsImageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200&h=400',
  songs: [
    { id: '1', title: 'Zamba de mi Esperanza', youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { id: '2', title: 'Luna Cordobesa', youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
  ],
  presentations: [
    { id: '1', date: '2023-10-15', location: 'Córdoba Capital', venue: 'Teatro Libertador', isPast: true },
    { id: '2', date: '2024-12-20', location: 'Villa María', venue: 'Anfiteatro Municipal', isPast: false },
    { id: '3', date: '2025-01-10', location: 'Cosquín', venue: 'Plaza Próspero Molina', isPast: false }
  ],
  contact: {
    email: 'contacto@carolinaferreyra.com',
    phone: '+54 351 123-4567',
    instagram: 'carolina.ferreyra.ok',
    facebook: 'CarolinaFerreyraMusica',
    whatsapp: '5493511234567',
    formspreeId: 'mjvgzjwv'
  }
};
