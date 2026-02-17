import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ContactComponent } from './pages/contact/contact.component';
import { TeamComponent } from './pages/team/team.component';

export const routes: Routes = [
     {
          path: '',
          component: HomeComponent,
          title: 'The Planning Paradise | Home',
          data: { description: 'Best wedding planners and event management company. We create unforgettable experiences.' }
     },
     {
          path: 'about',
          component: AboutComponent,
          title: 'About Us | The Planning Paradise',
          data: { description: 'Learn about our journey, our team, and our passion for creating magical events.' }
     },
     {
          path: 'portfolio',
          component: PortfolioComponent,
          title: 'Our Projects | The Planning Paradise',
          data: { description: 'Explore our portfolio of weddings, corporate events, and social gatherings.' }
     },
     {
          path: 'gallery',
          component: GalleryComponent,
          title: 'Gallery | The Planning Paradise',
          data: { description: 'View our gallery of decor, lighting, and stage designs for inspiration.' }
     },
     {
          path: 'contact',
          component: ContactComponent,
          title: 'Contact Us | The Planning Paradise',
          data: { description: 'Get in touch with us to plan your next event. We are here to help.' }
     },
     {
          path: 'team',
          component: TeamComponent,
          title: 'Our Team | The Planning Paradise',
          data: { description: 'Meet the creative minds dedicated to making your event a success.' }
     },
     { path: '**', redirectTo: '' }
];
