export interface Project {
     id: number;
     title: string;
     category: string; // 'wedding', 'corporate', 'cultural', etc.
     image: string;
     description: string;
     date: string;
     location?: string;
     clientName?: string;
     package?: string;
     facebookLink?: string;
     gallery?: string[]; // Additional images for details view
}
