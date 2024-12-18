import { Point } from "./../modules/polyline/polyline.interfaces";

export class MathUtils {
  /**
   * Calculates the Euclidean distance between two points.
   * @param p1 - First point.
   * @param p2 - Second point.
   * @returns The distance between p1 and p2.
   */
  static calculateDistance(p1: Point, p2: Point): number {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Computes the projection scalar t of a point onto a line segment.
   * @param p - The point.
   * @param a - Start of the segment.
   * @param b - End of the segment.
   * @returns The projection scalar t.
   */
  static computeProjectionScalar(p: Point, a: Point, b: Point): number {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dotProduct = (p.x - a.x) * dx + (p.y - a.y) * dy;
    const segmentLengthSquared = dx * dx + dy * dy;
    return segmentLengthSquared === 0 ? 0 : dotProduct / segmentLengthSquared;
  }

  /**
   * Calculates the perpendicular distance from a point to a line segment.
   * @param p - The point.
   * @param a - Start of the segment.
   * @param b - End of the segment.
   * @returns The perpendicular distance.
   */
  static calculatePerpendicularDistance(p: Point, a: Point, b: Point): number {
    const t = MathUtils.computeProjectionScalar(p, a, b);
    const projection = {
      x: a.x + t * (b.x - a.x),
      y: a.y + t * (b.y - a.y),
    };
    return MathUtils.calculateDistance(p, projection);
  }

  /**
   * Determines the projected point of a given point onto a line segment.
   * @param p - The point.
   * @param a - Start of the segment.
   * @param b - End of the segment.
   * @returns The projected point on the segment.
   */
  static calculateProjectedPoint(p: Point, a: Point, b: Point): Point {
    const t =  MathUtils.computeProjectionScalar(p, a, b);
    return {
      x: a.x + t * (b.x - a.x),
      y: a.y + t * (b.y - a.y),
    };
  }

  /**
   * Calculates the projection of a point onto a line segment.
   * If the projection falls outside the segment, the closest endpoint is returned.
   * 
   * @param point - The point to project onto the segment.
   * @param start - The starting point of the line segment.
   * @param end - The ending point of the line segment.
   * @returns The point on the line segment closest to the projection of the given point.
  */

  static getProjectionPointOnSegment(point: Point, start: Point, end: Point): Point {
    const projectionFactor = this.computeProjectionScalar(point, start, end);
    if (projectionFactor < 0) return start;
    if (projectionFactor > 1) return end;
    return this.calculateProjectedPoint(point, start, end);
  }
}