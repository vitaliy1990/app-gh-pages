
export enum Color {
  RED, 
  GREEN, 
  BLUE
}

export interface User {
  color: Color;
  name: string;
  speed: number;
  time: number;
}

export interface HelmetProps {
  color: Color;
}

export type getUsersListType = () => void;
export type handleScrollType = () => void;
