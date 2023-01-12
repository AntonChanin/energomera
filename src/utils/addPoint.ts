import { PolygonProps } from '../types/polygon';

const addPoint = (
  { points, source } : {
  points: any, source: PolygonProps
}) => {
  const { Name, Location: { Center } } = source;
  points.features.push({
    "type": "Feature",
    "properties": { "info_text": Name },
    "geometry": { "type": "Point", "coordinates": [ Center[0], Center[1] ] },
  })
}

export default addPoint;
