export interface Statistic {
     value: string;
     label: string;
     icon?: string;
}

export const STATISTICS: Statistic[] = [
     {
          value: '100+',
          label: 'Happy Clients',
          icon: 'bi-people-fill'
     },
     {
          value: '100+',
          label: 'Events Completed',
          icon: 'bi-calendar-check-fill'
     },
     {
          value: '20+',
          label: 'Events Per Month',
          icon: 'bi-graph-up-arrow'
     }
];
