export interface Project {
  id: number;
  value: string;
}

export interface Board {
  id: number;
  project: number;
  value: string;
}

export interface Lane {
  id: number;
  board: number;
  name: string;
}

export interface Ticket {
  id: number;
  lane: number;
  name: string;
  description: string;
}
