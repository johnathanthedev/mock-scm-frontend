/**
 * Generates a curved path between two geographical points.
 * 
 * The function calculates intermediate points between the start and end points
 * to form a curved path, using a combination of linear interpolation and trigonometric functions
 * to adjust the latitude and longitude of the intermediate points.
 * 
 * @param {Object} start - The starting point { lat: number, lng: number }.
 * @param {Object} end - The ending point { lat: number, lng: number }.
 * @param {number} curvature - The curvature factor to apply to the curve. Positive values curve upwards.
 * @param {number} numPoints - The number of points to generate for the curved path. More points mean a smoother curve.
 * @returns {Array<Object>} An array of points { lat: number, lng: number } representing the curved path.
 */
export function generateCurvedPath(start: { lat: number; lng: number; }, end: { lat: number; lng: number; }, curvature: number, numPoints: number) {
  let path = [];
  const { lat: lat1, lng: lng1 } = start;
  const { lat: lat2, lng: lng2 } = end;
  const dx = lng2 - lng1;
  const dy = lat2 - lat1;

  // Determine the direction of the curve based on the curvature sign
  const curveDirection = curvature < 0 ? -1 : 1;

  for (let i = 0; i < numPoints; i++) {
    const t = i / (numPoints - 1);
    const x = lng1 + dx * t;
    const y = lat1 + dy * t;

    // Apply curvature only to the y-coordinate (latitude)
    const xt = x;
    const yt = y + curveDirection * Math.sin(Math.PI * t) * Math.abs(curvature);

    path.push({ lat: yt, lng: xt });
  }

  return path;
}
