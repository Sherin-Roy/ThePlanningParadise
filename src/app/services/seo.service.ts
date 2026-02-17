import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
     providedIn: 'root'
})
export class SeoService {

     constructor(
          private titleService: Title,
          private metaService: Meta,
          @Inject(DOCUMENT) private doc: Document
     ) { }

     updateTitle(title: string) {
          this.titleService.setTitle(`${title} | The Planning Paradise`);
     }

     updateMetaTags(config: { title: string, description: string, image?: string, keywords?: string, url?: string }) {
          const title = `${config.title} | The Planning Paradise`;
          const image = config.image || 'assets/images/hero/home-hero.jpg'; // Default image
          const url = config.url || 'https://theplanningparadise.com/'; // Replace with actual domain

          // Update Title
          this.titleService.setTitle(title);

          // Standard Meta
          this.metaService.updateTag({ name: 'description', content: config.description });
          this.metaService.updateTag({ name: 'keywords', content: config.keywords || 'wedding planner, event management, corporate events, birthday party' });

          // Open Graph
          this.metaService.updateTag({ property: 'og:title', content: title });
          this.metaService.updateTag({ property: 'og:description', content: config.description });
          this.metaService.updateTag({ property: 'og:image', content: image });
          this.metaService.updateTag({ property: 'og:url', content: url });
          this.metaService.updateTag({ property: 'og:type', content: 'website' });

          // Twitter Card
          this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.metaService.updateTag({ name: 'twitter:title', content: title });
          this.metaService.updateTag({ name: 'twitter:description', content: config.description });
          this.metaService.updateTag({ name: 'twitter:image', content: image });
     }

     setStructuredData(data: any) {
          let script = this.doc.getElementById('app-structured-data');
          if (!script) {
               script = this.doc.createElement('script');
               script.id = 'app-structured-data';
               script.setAttribute('type', 'application/ld+json');
               this.doc.head.appendChild(script);
          }
          script.textContent = JSON.stringify(data);
     }
}
