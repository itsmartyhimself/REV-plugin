export interface Preset {
  id: string;
  name: string;
  category: string;
  tags: string[];
  description: string;
}

export interface Category {
  id: string;
  name: string;
}
