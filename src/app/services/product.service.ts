import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Product } from './../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private supabase: SupabaseClient;

  constructor() {
    // Supabase istemcisini environment dosyalarındaki URL ve anahtar ile başlatıyoruz.
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // Tüm ürünleri getiren fonksiyon
  async getProducts(): Promise<Product[]> {
    // 'products' tablosundan tüm sütunları (*) seçiyoruz.
    // Supabase sorgunuzu SQL'e benzer bir yapıda oluşturursunuz.
    const { data, error } = await this.supabase
      .from('products') // Tablo adınız 'products' ise
      .select('*');     // Tüm sütunları seç

    if (error) {
      console.error('Supabase\'den veri çekerken hata oluştu:', error);
      throw error; // Hata varsa, hatayı fırlat
    }

    // Veri null değilse ve boş değilse, Product[] tipine dönüştürerek döndür.
    // Supabase'den gelen veri any[] olabilir, bu yüzden tip dönüşümü yapıyoruz.
    return data as Product[] || [];
  }

  // İleride tek bir ürün getirme, ürün ekleme, güncelleme, silme gibi
  // fonksiyonları da buraya ekleyebilirsiniz.
  // Örnek:
  // async getProductById(id: string): Promise<Product | null> {
  //   const { data, error } = await this.supabase
  //     .from('products')
  //     .select('*')
  //     .eq('id', id) // id'ye göre filtrele
  //     .single(); // Tek bir kayıt bekliyorsak
  //
  //   if (error) {
  //     console.error('Tek ürün çekerken hata:', error);
  //     return null;
  //   }
  //   return data as Product;
  // }
}