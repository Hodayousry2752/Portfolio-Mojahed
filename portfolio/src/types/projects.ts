// src/types/projects.ts
export interface VideoType {
  id: string | number; 
  title: string;
  duration?: string;
  videoUrl: string;
  thumbnail: string;
  date: string;
  color: string;
  featured?: boolean;
  tags?: string[];
  description?: string;
  size?: string;
  location?: string;
  resolution?: string;
  altitude?: string;
  thumbnailUrl?: string; 
  videoCount?: number; 
}

export interface ProjectCategory {
  id: string;
  key: string;
  title: string;
  description: string; 
  tags: string[];
  link: string;
  videoCount?: number;
  image?: string;
  icon?: string;
  color?: string;
  featured?: boolean;
}

export interface LogoDesign {
  id: number;
  name: string;
  category: string;
  color: string;
  description?: string;
  createdAt: string;
  imageUrl: string;
  featured?: boolean;
}