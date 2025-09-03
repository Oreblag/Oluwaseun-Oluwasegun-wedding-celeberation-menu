export type Wing = 'groom' | 'bride';
export type Course = 'main' | 'beverage';

export interface Guest {
  wing: Wing;
  table: string;
  name: string;
}

export interface MenuSelection {
    main: string;
    sides: string;
    swallows: string;
    soups: string;
    protein: string;
  }

export interface Order extends Guest, MenuSelection {}