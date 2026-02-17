import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import * as THREE from 'three';
// @ts-ignore
import HALO from 'vanta/dist/vanta.halo.min';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit, OnDestroy {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() backgroundImage: string = '';
  @Input() showButtons: boolean = false;
  @Input() isHome: boolean = false;
  @Input() useVanta: boolean = false;

  isLoading: boolean = true;
  hasError: boolean = false;

  onImageLoad() {
    this.isLoading = false;
    this.hasError = false;
  }

  onImageError() {
    this.isLoading = false;
    this.hasError = true;
  }

  @ViewChild('heroBackground', { static: true }) heroBackground!: ElementRef;

  private vantaEffect: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    // Ensure page loads at top
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);

      if (this.useVanta) {
        this.initVanta();
      }
    }
  }

  initVanta() {
    try {
      this.vantaEffect = HALO({
        el: this.heroBackground.nativeElement,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        THREE: THREE,
        baseColor: 0x6b46c1, // Primary purple
        backgroundColor: 0x1a202c, // Dark background
        amplitudeFactor: 1.5,
        size: 1.5
      });
    } catch (e) {
      console.warn('Vanta initialization failed', e);
    }
  }

  ngOnDestroy() {
    if (this.vantaEffect) this.vantaEffect.destroy();
  }
}
