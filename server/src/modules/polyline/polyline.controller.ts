import { Request, Response } from 'express';
import { PolylineService } from './polyline.service';
import { Point, Segment } from './polyline.interfaces';

export class PolylineController {
  private polylineService: PolylineService;

  constructor() {
    this.polylineService = new PolylineService();
  }

  /**
   * Handles the request to calculate station and offset for a point relative to a polyline.
   * @param req - Express request object containing the polyline and point data in the body.
   * @param res - Express response object used to send back the result or error.
   * @returns Void
   */
  public calculateStationAndOffset = (req: Request, res: Response): void => {
    try {
      const { polyline, point }: { polyline: Segment[], point: Point } = req.body;

      const result = this.polylineService.calculateStationAndOffset(polyline, point);

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error.' });
    }
  };
}
