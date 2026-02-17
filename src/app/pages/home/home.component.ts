import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroComponent } from '../../components/hero/hero.component';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { LazyImageComponent } from '../../components/shared/lazy-image/lazy-image.component';
import { Project } from '../../models/project.model';
import { PROJECTS } from '../../data/projects.data';
import { STATISTICS, Statistic } from '../../data/statistics.data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, HeroComponent, ProjectCardComponent, LazyImageComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  featuredProjects: Project[] = [];
  statistics: Statistic[] = STATISTICS;

  services = [
    { title: 'Weddings', icon: 'bi-heart', desc: 'Crafting your dream wedding with elegance and perfection.' },
    { title: 'Corporate Events', icon: 'bi-briefcase', desc: 'Professional planning for conferences, launches, and galas.' },
    { title: 'Social Gatherings', icon: 'bi-people', desc: 'Birthdays, anniversaries, and intimate celebrations.' },
    { title: 'Cultural Events', icon: 'bi-gem', desc: 'Celebrating traditions with grandeur and respect.' },
    { title: 'Birthday Parties', icon: 'bi-gift', desc: 'Making every birthday bash a memorable milestone.' },
    { title: 'Anniversaries', icon: 'bi-calendar-heart', desc: 'Relive your special moments with a perfect celebration.' },
    { title: 'Theme Parties', icon: 'bi-mask', desc: 'Immersive themes that transport you to another world.' }
  ];

  // Modal
  selectedProject: Project | null = null;
  currentImageIndex = 0;
  private carouselInterval: any;

  ngOnInit() {
    this.featuredProjects = PROJECTS.slice(0, 4);
  }

  ngOnDestroy() {
    this.stopCarousel();
  }

  // Modal Methods
  openModal(project: Project) {
    this.selectedProject = project;
    this.currentImageIndex = 0;
    this.startCarousel();
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  closeModal() {
    this.selectedProject = null;
    this.stopCarousel();
    document.body.style.overflow = '';
  }

  startCarousel() {
    this.stopCarousel(); // Clear existing interval if any
    if (this.selectedProject?.gallery && this.selectedProject.gallery.length > 1) {
      this.carouselInterval = setInterval(() => {
        this.nextImage();
      }, 3000); // Auto-scroll every 3 seconds
    }
  }

  stopCarousel() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
      this.carouselInterval = null;
    }
  }

  nextImage() {
    if (this.selectedProject && this.selectedProject.gallery) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.selectedProject.gallery.length;
    }
  }

  prevImage() {
    if (this.selectedProject && this.selectedProject.gallery) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.selectedProject.gallery.length) % this.selectedProject.gallery.length;
    }
  }

  get currentDisplayImage(): string {
    if (this.selectedProject) {
      if (this.selectedProject.gallery && this.selectedProject.gallery.length > 0) {
        return this.selectedProject.gallery[this.currentImageIndex];
      }
      return this.selectedProject.image;
    }
    return '';
  }
}
