export interface Trace {
  x: number[];
  y: number[];
  mode: string;
  name: string;
  line?: { color: string; width: number };
  marker?: { color: string; size: number };
}