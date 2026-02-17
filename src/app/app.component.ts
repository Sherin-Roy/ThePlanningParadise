import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SeoService } from './services/seo.service';
import { AnimationService } from './services/animation.service';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'the-planning-paradise';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
    private titleService: Title,
    private animationService: AnimationService
  ) { }

  ngOnInit() {
    // Structured Data (Organization)
    this.seoService.setStructuredData({
      "@context": "https://schema.org",
      "@type": "EventPlanner",
      "name": "The Planning Paradise",
      "url": "https://theplanningparadise.com",
      "logo": "https://theplanningparadise.com/assets/logo.png",
      "sameAs": [
        "https://www.instagram.com/theplanningparadise",
        "https://www.facebook.com/theplanningparadise"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9876543210",
        "contactType": "customer service"
      }
    });

    // Dynamic Meta Tags
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      mergeMap(route => route.data)
    ).subscribe(data => {
      const title = this.titleService.getTitle();

      this.seoService.updateMetaTags({
        title: title,
        description: data['description'] || 'Welcome to The Planning Paradise, your premier event management company.',
        image: 'assets/images/hero/home-hero.jpg',
        url: window.location.href
      });
    });
  }

  ngAfterViewInit() {
    this.animationService.init();
  }
}
