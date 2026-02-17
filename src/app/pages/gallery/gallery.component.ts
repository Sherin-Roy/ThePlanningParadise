import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { DesignCardComponent } from '../../components/design-card/design-card.component';
import { LazyImageComponent } from '../../components/shared/lazy-image/lazy-image.component';
import { GalleryItem } from '../../models/gallery-item.model';
import { GALLERY_ITEMS } from '../../data/gallery.data';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, HeroComponent, DesignCardComponent, LazyImageComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit {
  items: GalleryItem[] = [];
  filteredItems: GalleryItem[] = [];
  paginatedItems: GalleryItem[] = [];
  categories: string[] = ['All', 'Premium', 'Gold', 'Silver', 'Front Arch', 'Car Decor', 'Hindu Traditional']; // Updated categories
  activeCategory: string = 'All';

  categoryMetadata: { [key: string]: { title: string; subtitle: string } } = {
    'All': {
      title: 'Every Celebration',
      subtitle: 'A curated collection of our finest moments, across traditions and occasions.'
    },
    'Premium': {
      title: 'Signature Celebrations',
      subtitle: 'Luxury-crafted events designed with precision, elegance, and grandeur.'
    },
    'Gold': {
      title: 'Golden Moments',
      subtitle: 'Timeless celebrations styled with richness and radiant charm.'
    },
    'Silver': {
      title: 'Silver Grace',
      subtitle: 'Refined décor concepts that blend simplicity with sophistication.'
    },
    'Front Arch': {
      title: 'Grand Entrances',
      subtitle: 'Stunning arch designs that create unforgettable first impressions.'
    },
    'Car Decor': {
      title: 'Wedding Rides',
      subtitle: 'Elegant floral car décor crafted for your special journey.'
    },
    'Hindu Traditional': {
      title: 'Sacred Traditions',
      subtitle: 'Authentic Hindu wedding décor rooted in culture and divine aesthetics.'
    }
  };

  get currentCategoryTitle(): string {
    return this.categoryMetadata[this.activeCategory]?.title || 'Our Gallery';
  }

  get currentCategorySubtitle(): string {
    return this.categoryMetadata[this.activeCategory]?.subtitle || 'Explore our beautiful designs';
  }

  // Pagination
  currentPage = 1;
  pageSize = 12; // Adjusted for better viewing experience with 66 items
  totalPages = 1;

  ngOnInit() {
    this.items = GALLERY_ITEMS;
    console.log('Gallery Items Loaded:', this.items.length);
    console.log('First Item:', this.items[0]?.designCode);
    this.filterGallery('All');
  }

  filterGallery(category: string) {
    this.activeCategory = category;
    this.currentPage = 1;

    if (category === 'All') {
      this.filteredItems = this.items;
    } else {
      this.filteredItems = this.items.filter(item =>
        item.category.toLowerCase() === category.toLowerCase()
      );
    }
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredItems.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedItems = this.filteredItems.slice(startIndex, startIndex + this.pageSize);
  }

  changePage(delta: number) {
    const newPage = this.currentPage + delta;
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.updatePagination();
      // Scroll to top of grid
      document.querySelector('.filters')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Modal & Carousel
  selectedItem: GalleryItem | null = null;
  currentImageIndex = 0;
  carouselInterval: any;

  openModal(index: number) {
    this.selectedItem = this.paginatedItems[index];
    this.currentImageIndex = 0;
    this.startCarousel();
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.selectedItem = null;
    this.stopCarousel();
    document.body.style.overflow = '';
  }

  startCarousel() {
    this.stopCarousel();
    if (this.selectedItem?.gallery && this.selectedItem.gallery.length > 1) {
      this.carouselInterval = setInterval(() => {
        this.nextImage();
      }, 3000);
    }
  }

  stopCarousel() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
      this.carouselInterval = null;
    }
  }

  nextImage() {
    if (this.selectedItem && this.selectedItem.gallery) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.selectedItem.gallery.length;
    }
  }

  prevImage() {
    if (this.selectedItem && this.selectedItem.gallery) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.selectedItem.gallery.length) % this.selectedItem.gallery.length;
    }
  }

  get currentDisplayImage(): string {
    if (this.selectedItem) {
      if (this.selectedItem.gallery && this.selectedItem.gallery.length > 0) {
        return this.selectedItem.gallery[this.currentImageIndex];
      }
      return this.selectedItem.src;
    }
    return '';
  }

  inquire(item: GalleryItem) {
    const message = `Hello The Planning Paradise!

I am interested in this specific design from your gallery.

*Design Code:* ${item.designCode}
*Category:* ${item.category}

Please let me know more details about this package.`;

    const whatsappUrl = `https://wa.me/${environment.whatsapp.phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }
}

