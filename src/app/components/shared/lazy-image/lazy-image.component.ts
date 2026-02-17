import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lazy-image',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="image-container" 
         [class.loading]="isLoading" 
         [class.error]="hasError" 
         [class.transparent]="transparent"
         [style.height]="height">
      <!-- Skeleton Loader -->
      <div *ngIf="isLoading && !hasError" class="skeleton-loader"></div>

      <!-- Main Image -->
      <img
        *ngIf="!hasError"
        [src]="src"
        [alt]="alt"
        [class.loaded]="!isLoading"
        [style.object-fit]="objectFit"
        (load)="onLoad()"
        (error)="onError()"
        loading="lazy"
      />

      <!-- Fallback / Error UI -->
      <div *ngIf="hasError" class="error-fallback animate-fade-in">
        <div class="fallback-content">
          <i class="bi bi-image"></i>
          <p>{{ alt || 'Image Preview' }} Unavailable</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .image-container {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #f5f5f7;
      border-radius: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      
      // Fix for flickering corners in WebKit browsers
      -webkit-mask-image: -webkit-radial-gradient(white, black);
      backface-visibility: hidden;
      transform: translateZ(0);
    }
    
    .transparent {
      background: transparent !important;
    }

    img {
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      display: block;
    }

    img.loaded {
      opacity: 1;
    }

    .skeleton-loader {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        rgba(238, 238, 238, 0) 0,
        rgba(238, 238, 238, 0.5) 50%,
        rgba(238, 238, 238, 0) 100%
      );
      background-color: #f0f0f0;
      background-size: 200% 100%;
      animation: shimmer 2s infinite linear;
      z-index: 1;
    }

    .error-fallback {
      width: 100%;
      height: 100%;
      background: #f8f9fa;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #adb5bd;
      padding: 1rem;
      text-align: center;
      border: 1px dashed #dee2e6;
    }

    .fallback-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;

      i {
        font-size: 2rem;
        margin-bottom: 0.25rem;
      }

      p {
        font-size: 0.85rem;
        margin: 0;
        font-weight: 500;
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }

    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    .animate-fade-in {
      animation: fadeIn 0.5s ease forwards;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .loading {
      min-height: 100px;
    }
  `]
})
export class LazyImageComponent {
  @Input() src: string = '';
  @Input() alt: string = '';
  @Input() height: string = '100%';
  @Input() objectFit: 'cover' | 'contain' | 'fill' = 'cover';
  @Input() transparent: boolean = false;

  isLoading = true;
  hasError = false;

  onLoad() {
    this.isLoading = false;
    this.hasError = false;
  }

  onError() {
    this.isLoading = false;
    this.hasError = true;
  }
}
