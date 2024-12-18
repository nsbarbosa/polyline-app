export interface Point {
  x: number;
  y: number;
}

export interface Segment {
  start: Point;
  end: Point;
}

export interface Result { 
  station: number;
  offset: number;
  coordinates: Point;
};
  
export interface PolylineRequestBody {
  polyline: Segment[];
  point: Point;
}