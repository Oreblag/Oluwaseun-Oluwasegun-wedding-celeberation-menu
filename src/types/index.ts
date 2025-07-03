export type Wing = 'groom' | 'bride';
export type Course = 'main' | 'protein' | 'beverage' | 'appetizer';

export interface Guest {
  wing: Wing;
  table: string;
  name: string;
}

export interface MenuSelection {
    main: string;
    protein: string;
    beverage: string;
    appetizer: string;
}

export interface Order extends Guest, MenuSelection {}