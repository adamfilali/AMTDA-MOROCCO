export type Language = 'fr' | 'en' | 'zh';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  avatar: string; // url or data-url
  isApproved: boolean;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  description: string;
  category: 'events' | 'screenings' | 'classrooms' | 'drawings';
}

export interface Article {
  id: string;
  title: { [key in Language]: string };
  excerpt: { [key in Language]: string };
  content: { [key in Language]: string };
  image: string;
  date: string;
  category: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage?: string;
  coverUrl?: string;
  coverColor?: string;
  pages: string[]; // text content for each page
  narrationAudio?: string; // fallback voice synthetics
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
  lyrics?: string;
}

export interface CultureItem {
  id: string;
  type: 'video' | 'magazine' | 'tale';
  title: string;
  description: string;
  image: string;
  actionPayload: string;
  videoUrl?: string;
}

export interface ClickStats {
  pageViews: number;
  gamePlays: { [key: string]: number };
  downloads: number;
  prints: number;
  phoneClicks: number;
  whatsappClicks: number;
}
