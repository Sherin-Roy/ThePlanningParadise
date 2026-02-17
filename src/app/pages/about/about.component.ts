import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { RouterLink } from '@angular/router';
import { LazyImageComponent } from '../../components/shared/lazy-image/lazy-image.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, HeroComponent, RouterLink, LazyImageComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent { }
