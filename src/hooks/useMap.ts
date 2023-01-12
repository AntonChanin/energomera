import mapboxgl from 'mapbox-gl';
import { RefObject, useEffect } from 'react';

import PointCollection from '../models/PointCollection';
import Polygon from '../models/Polygon';
import addPoint from '../utils/addPoint';
import { MapState } from '../types/map';
import { PolygonLocation, RowPolygonProps } from '../types/polygon';

type Props = {
  response: RowPolygonProps[];
  loading: boolean;
  error: string;
  state: MapState;
  mapContainer: RefObject<HTMLDivElement>;
}

const useMap: (props: Props) => void = ({
  response, loading, error, state, mapContainer,
}) => {
  useEffect(() => {
    const { params: {lat, lng, zoom }, styles: { style } } = state;
    if (!loading && !error) {
      const map = mapContainer.current && new mapboxgl.Map({
        container: mapContainer.current,
        style, 
        center: [lng, lat],
        zoom
      });
      
      const points: any = {
        'type': 'FeatureCollection',
        "features": [],
      };

      map && map.on('load', () => {
        response
          .map((polygon) => {
            const { Center, Polygon } = JSON.parse(polygon.Location) as PolygonLocation;
            return ({
              ...polygon,
              Location: {
                Center: Center.reverse(),
                Polygon,
              },
              SyncDate: new Date(polygon.SyncDate)
            })
          })
          .map((polygon) => {
            new Polygon(polygon, map)
              .didMount()
              .addLayers({
                'fill': {
                  'fill-color': '#fff',
                  'fill-opacity': 0.1
                },
                'line': {
                  'line-color': '#fff',
                  'line-width': 3
                }
              });
            new Polygon({
              ...polygon,
              $id: `${polygon.$id}_label`,
              Location: {
                ...polygon.Location,
                Polygon: [
                  [polygon.Location.Center[1] - 0.0005, polygon.Location.Center[0] + 0.001],
                  [polygon.Location.Center[1] + 0.0005, polygon.Location.Center[0] + 0.001],
                  [polygon.Location.Center[1] + 0.0005, polygon.Location.Center[0] - 0.001],
                  [polygon.Location.Center[1] - 0.0005, polygon.Location.Center[0] - 0.001],
                ]
              }
            }, map)
              .didMount()
              .addLayers({
                'fill': {
                  'fill-color': 'green',
                },
                'line': {
                  'line-color': '#000',
                  'line-width': 3
                }
              });
            addPoint({ points, source: polygon });
              return;
          });
        new PointCollection({ points }, map)
          .didMount()
          .addLayers(['unclustered-text'])
      })
    }
  }, [loading, mapContainer])
};

export default useMap;
