
export interface Song {
  id: string;
  title: string;
  youtubeUrl: string;
}

export interface Presentation {
  id: string;
  date: string;
  location: string;
  venue: string;
  isPast: boolean;
}

export interface ContactInfo {
  email: string;
  phone: string;
  instagram: string;
  facebook: string;
  whatsapp: string;
  formspreeId: string;
}

export interface AppData {
  primaryColor: string;
  aboutText: string;
  heroImageUrl: string;
  heroImageUrlSecondary: string;
  aboutImageUrl: string;
  presentationsImageUrl: string;
  songs: Song[];
  presentations: Presentation[];
  contact: ContactInfo;
}
