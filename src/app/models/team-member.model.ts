export interface TeamMember {
     id: number;
     name: string;
     role: string;
     image: string;
     description?: string;
     socialLinks?: {
          linkedin?: string;
          instagram?: string;
          twitter?: string;
     };
}
