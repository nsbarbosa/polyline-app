import { defineStore } from "pinia";
import axiosInstance from "@/services/axios";
import type { ResultData } from "@/interfaces/ResultData";
import type { PolylineSegment } from "@/interfaces/PolylineSegment";
import type { Point } from "@/interfaces/Point";
import { useNotificationStore } from "@/stores/notificationStore";

const notificationStore = useNotificationStore();

export const usePolylineStore = defineStore("polyline", () => {
  const polylineFile = ref<File | undefined>(undefined);
  const xCoordinate = ref<number | undefined>(undefined);
  const yCoordinate = ref<number | undefined>(undefined);
  const chartCoordinates = ref<{ x: number[], y: number[] }>({ x: [], y: [] });
  const result = ref<ResultData | undefined>(undefined);
  const loading = ref<boolean>(false);
  const polyline = ref<PolylineSegment[] | null>(null);

  /**
   * Reads the content of an ASCII file and returns it as a string.
   * @param file - The ASCII file to read.
   * @returns A promise that resolves to the file content as a string.
   */
  async function readFileAsText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result?.toString() || "");
      reader.onerror = () => reject(new Error("Error reading file."));
      reader.readAsText(file);
    });
  }

  /**
   * Parses the content of the ASCII file into polyline segments.
   * @param content - The content of the ASCII file as a string.
   * @returns An object containing the parsed polyline segments and coordinates.
   * @throws An error if the file format is invalid.
   */
  function parsePolyline(content: string): { segments: PolylineSegment[], coordinates: { x: number[], y: number[] } } {
    const lines = content.split("\n").filter(line => line.trim() !== "");
    const points = lines.map(parsePoint);
    return createPolylineSegments(points);
  }

  /**
   * Parses a line of text into a point.
   * @param line - A line of text containing space or comma-separated x and y coordinates.
   * @returns A point with x and y coordinates.
   * @throws An error if the point format is invalid.
   */
  function parsePoint(line: string): Point {
    const [x, y] = line.trim().split(/[\s,]+/).map(Number);
    if (isNaN(x) || isNaN(y)) throw new Error(`Invalid point format: "${line}"`);
    return { x, y };
  }

  /**
   * Creates polyline segments and extracts coordinates in a single pass.
   * @param points - An array of points.
   * @returns An object containing polyline segments and the coordinates for chart plotting.
   */
  function createPolylineSegments(points: Point[]): { segments: PolylineSegment[], coordinates: { x: number[], y: number[] } } {
    const segments: PolylineSegment[] = [];
    const xCoordinates: number[] = [];
    const yCoordinates: number[] = [];

    for (let i = 0; i < points.length - 1; i++) {
      segments.push({ start: points[i], end: points[i + 1] });
      xCoordinates.push(points[i].x, points[i + 1].x);
      yCoordinates.push(points[i].y, points[i + 1].y);
    }

    return {
      segments,
      coordinates: { x: xCoordinates, y: yCoordinates }
    };
  }

  /**
   * Processes the uploaded polyline file and sends data to the server for calculation.
   */
  async function processPolylineFile(): Promise<void> {
    try {
      loading.value = true;
      const fileContent = await readFileAsText(polylineFile.value!);
      const { segments, coordinates } = parsePolyline(fileContent);

      chartCoordinates.value = coordinates;
      polyline.value = segments;
      
      const bodyData = {
        polyline: segments,
        point: { x: Number(xCoordinate.value), y: Number(yCoordinate.value) },
      };

      const response = await axiosInstance.post("/calculate", bodyData);

      result.value = {
        inputPoint: bodyData.point,
        coordinates: response.data.coordinates,
        station: response.data.station,
        offset: response.data.offset,
      };
    } catch (error) {
      console.error("Error processing polyline file:", error);
      notificationStore.showNotification({
        show: true,
        content: "Error processing polyline file!",
        color: "danger"
      });
    } finally {
      loading.value = false;
    }
  }

  return {
    polylineFile,
    xCoordinate,
    yCoordinate,
    result,
    loading,
    polyline,
    chartCoordinates,
    processPolylineFile
  };
});
