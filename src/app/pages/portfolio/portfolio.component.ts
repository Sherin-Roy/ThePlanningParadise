import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { LazyImageComponent } from '../../components/shared/lazy-image/lazy-image.component';
import { Project } from '../../models/project.model';
import { PROJECTS } from '../../data/projects.data';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, HeroComponent, LazyImageComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  pagedProjects: Project[] = [];

  categories: string[] = [
    "All",
    "Wedding",
    "Engagement",
    "Baptism",
    "Hindhu Traditional Wedding",
    "Naming Ceremony"
  ];
  activeCategory: string = 'All';

  categoryMetadata: { [key: string]: { title: string; subtitle: string } } = {
    'All': {
      title: 'Our Portfolio',
      subtitle: 'A curated showcase of our finest celebrations and signature designs.'
    },
    'Wedding': {
      title: 'Wedding Stories',
      subtitle: 'Beautifully crafted weddings filled with love, detail, and timeless elegance.'
    },
    'Engagement': {
      title: 'The Promise',
      subtitle: 'Intimate celebrations marking the beginning of forever.'
    },
    'Baptism': {
      title: 'Blessed Beginnings',
      subtitle: 'Graceful baptism décor celebrating faith and new life.'
    },
    'Hindhu Traditional Wedding': {
      title: 'Sacred Union',
      subtitle: 'Authentic Hindu wedding décor rooted in culture and divine rituals.'
    },
    'Naming Ceremony': {
      title: 'Little Blessings',
      subtitle: 'Heartwarming ceremonies welcoming new beginnings with love.'
    }
  };

  get currentCategoryTitle(): string {
    return this.categoryMetadata[this.activeCategory]?.title || 'Our Projects';
  }

  get currentCategorySubtitle(): string {
    return this.categoryMetadata[this.activeCategory]?.subtitle || 'Explore our work';
  }

  // Pagination
  pageSize = 8;
  currentPage = 1;
  totalPages = 0;

  // Modal
  selectedProject: Project | null = null;
  currentImageIndex = 0;
  private carouselInterval: any;

  ngOnInit() {
    this.projects = PROJECTS;
    this.filterProjects('All');
  }

  ngOnDestroy() {
    this.stopCarousel();
  }

  filterProjects(category: string) {
    this.activeCategory = category;
    this.currentPage = 1; // Reset to first page on filter change

    if (category === 'All') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(p =>
        p.category.toLowerCase() === category.toLowerCase()
      );
    }
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredProjects.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedProjects = this.filteredProjects.slice(startIndex, startIndex + this.pageSize);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
