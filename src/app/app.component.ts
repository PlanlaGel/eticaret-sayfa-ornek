/* import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'eticaret-sayfa-ornek';
}
 */

import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common'; // *ngFor, *ngIf gibi direktifler için
import { ProductService } from './services/product.service'; // ProductService'i import ediyoruz
import { Product } from './model/product';

@Component({
  selector: 'app-root',
  standalone: true, // Angular v17+ ile gelen standalone component yapısı
  imports: [CommonModule], // Gerekli modülleri buraya ekliyoruz
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush, // Performans için OnPush stratejisi
})
export class AppComponent implements OnInit {
  products: Product[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  // ProductService'i dependency injection ile alıyoruz.
  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef // Değişiklikleri manuel tetiklemek için
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  async loadProducts(): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      // ProductService üzerinden ürünleri asenkron olarak çekiyoruz.
      this.products = await this.productService.getProducts();
    } catch (err) {
      console.error('Ürünler yüklenirken hata:', err);
      // Kullanıcıya gösterilecek hata mesajını ayarlıyoruz.
      // err objesi SupabaseError tipinde olabilir, message özelliğini kontrol edin.
      this.error =
        err instanceof Error
          ? err.message
          : 'Ürünler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges(); // Veri yüklendikten sonra değişikliği algıla
    }
  }
}
