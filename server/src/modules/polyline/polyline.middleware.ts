import { Request, Response, NextFunction } from 'express';
import { PolylineRequestBody } from './polyline.interfaces';

/**
 * Middleware to validate the polyline request.
 * 
 * This function checks that the `polyline` and `point` in the request body are properly formatted. 
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function to call if validation passes.
 * 
 * @returns {void} - Sends a 400 response if validation fails or calls `next()` if validation passes.
 */
export function validatePolylineRequest(req: Request<{}, {}, PolylineRequestBody>, res: Response, next: NextFunction): void {
  const { polyline, point } = req.body;
  const errors: string[] = [];

  if (!Array.isArray(polyline)) {
    errors.push('Polyline must be an array.');
  } else {
    for (const segment of polyline) {
      if (
        typeof segment !== 'object' ||
        !segment.start ||
        !segment.end ||
        typeof segment.start.x !== 'number' ||
        typeof segment.start.y !== 'number' ||
        typeof segment.end.x !== 'number' ||
        typeof segment.end.y !== 'number'
      ) {
        errors.push('Each polyline segment must have valid start and end points with x and y coordinates.');
        break;
      }
    }
  }

  if (
    typeof point !== 'object' ||
    typeof point.x !== 'number' ||
    typeof point.y !== 'number'
  ) {
    errors.push('Point must be an object with x and y coordinates.');
  }

  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  next();
}
