export interface Product {
  id: string; // UUID genelde string olarak işlenir
  name: string;
  description?: string; // Açıklama opsiyonel olabilir
  price: number;
  picture_url?: string; // Resim URL'si opsiyonel olabilir
  type?: string;
  brand?: string;
  quantity_in_stock: number;
  created_at: string; // Tarih string olarak veya Date olarak işlenebilir
}
