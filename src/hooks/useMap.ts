import mapboxgl from 'mapbox-gl';
import { RefObject, useEffect } from 'react';

import PointCollection from '../models/PointCollection';
import Polygon from '../models/Polygon';
import { MapState } from '../types/map';
import addPoint from '../utils/addPoint';

type Props = {
  response: any[];
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
            const { Center, Polygon } = JSON.parse(polygon.Location);
            return ({
              ...polygon,
              Location: {
                Center: Center.reverse(),
                Polygon,
              }
            })
          })
          .map((polygon) => {
            new Polygon(polygon, map).didMount().addLayers([polygon.$id, 'outline']);
            addPoint({ points, source: polygon });
            return;
          });
        new PointCollection({ points }, map).didMount().addLayers(['unclustered-point', 'unclustered-text'])
      })
    }
  }, [loading, mapContainer])
};

export default useMap;
