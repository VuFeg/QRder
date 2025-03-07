export interface Menu {
  id: string;
  available: boolean;
  category: string;
  description: string;
  image_url: string;
  name_en: string;
  name_vi: string;
  price: number;
}

export interface MenuItem {
  available: boolean;
  category: string;
  description: string;
  image_url: string;
  name_en: string;
  name_vi: string;
  price: number;
}

export interface CreateMenuForm {
  category: string;
  description: string;
  image_url: string;
  name_en: string;
  name_vi: string;
  price: number;
}
