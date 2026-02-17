import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private observer: IntersectionObserver | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  init() {
    if (!isPlatformBrowser(this.platformId)) return;

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: Unobserve after visible if you want it only once
          // this.observer?.unobserve(entry.target);
        }
      });
    }, options);

    this.observeElements();
  }

  observeElements() {
    if (!this.observer) return;

    // Select all elements with animate classes
    const elements = document.querySelectorAll('.animate-fade-up, .animate-fade-in');
    elements.forEach(el => this.observer?.observe(el));
  }
}
