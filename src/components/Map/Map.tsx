import React, { FC, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

import useAxios from '../../hooks/useAxios';
import useMap from '../../hooks/useMap';
import { MapState } from '../../types/map';
import { PolygonRequest } from '../../types/net';
import './Map.css';

(mapboxgl as any).accessToken=import.meta.env.VITE_REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map: FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<MapState>({
    params: {
      lat: 45.3385364852744,
      lng: 42.50865653359858,
      zoom: 12,
    },
    styles: {
      style: 'mapbox://styles/mapbox/satellite-streets-v12'
    },
  });
  const [queryParams, setQueryParams] = useState({
    lastChangeDate: '2022-01-01T10:00:00.000',
    skip: 0,
    take:100,
  });

  const request: PolygonRequest = useAxios(queryParams);
  useMap({ ...request, state, mapContainer });

	return (
    <div id='mapContainer' ref={mapContainer} style={{ width:'100%', height:'100vh' }}/>
  );   
}

export default Map;
