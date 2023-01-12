import { RefObject, useEffect } from 'react';

import { MapState } from '../types/map';
import { PolygonLocation, RowPolygonProps } from '../types/polygon';
import UserMapboxglMap from '../models/UserMapboxglMap';

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
      const map = mapContainer.current && new UserMapboxglMap({
        container: mapContainer.current,
        style, 
        center: [lng, lat],
        zoom
      }).didMount();
      
      map && map.self?.on('load', () => {
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
          .forEach((polygon) => {
            map.self && map.fillField(polygon);
            map.self && map.addLabel(polygon);
            map.self && map.addPoint(polygon);
            return;
          });
          map.createPointCollection();
      })
    }
  }, [loading, mapContainer])
};

export default useMap;
