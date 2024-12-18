import express from 'express';
import { PolylineController } from '../modules/polyline/polyline.controller';
import { validatePolylineRequest } from '../modules/polyline/polyline.middleware';

const router = express.Router();
const polylineController = new PolylineController();

router.get('/test', (req, res) => {
    res.status(200).json({ message: 'Server is working!' });
  });

router.post('/calculate', validatePolylineRequest, polylineController.calculateStationAndOffset);


export default router;

