import { MathUtils } from '../../utils/mathUtils';
import { Point, Segment, Result } from './polyline.interfaces';

export class PolylineService {
  /**
   * Calculates the station and offset for a given point relative to the polyline.
   * @param segments - Array of polyline segments.
   * @param point - The target point.
   * @returns The station, offset, and closest point on the polyline.
   */
  public calculateStationAndOffset(segments: Segment[], point: Point): Result {
    let totalLength = 0;
    let smallestOffset = Infinity;
    let closestStation = 0;
    let closestPointOnPolyline = { x: 0, y: 0 };

    for (const segment of segments) {
      const segmentLength = MathUtils.calculateDistance(segment.start, segment.end);
      const projectionPoint = MathUtils.getProjectionPointOnSegment(point, segment.start, segment.end);
      const offset = MathUtils.calculateDistance(point, projectionPoint);

      if (this.isCloserPoint(offset, smallestOffset)) {
        smallestOffset = offset;
        closestStation = this.calculateStation(totalLength, segmentLength, MathUtils.computeProjectionScalar(point, segment.start, segment.end));
        closestPointOnPolyline = projectionPoint;
      }

      totalLength += segmentLength;
    };

    return { 
      station: closestStation, 
      offset: smallestOffset, 
      coordinates: closestPointOnPolyline
    };
  }

  private calculateStation(totalLength: number, segmentLength: number, projectionRatio: number): number {
    if (projectionRatio < 0) return totalLength;
    if (projectionRatio > 1) return totalLength + segmentLength;
    return totalLength + projectionRatio * segmentLength;
  }

  private isCloserPoint(newOffset: number, currentOffset: number): boolean {
    return newOffset < currentOffset;
  }
}
