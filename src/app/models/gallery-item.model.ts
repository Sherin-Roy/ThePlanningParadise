export interface GalleryItem {
     id: number;
     src: string;
     category: 'Diamond' | 'Gold' | 'Silver' | string;
     alt: string;
     designCode: string;
     clientCount: number;
     tag?: string;
     gallery?: string[];
}
