import React, { FC, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

import useAxios from '../../hooks/useAxios';
import Polygon from '../../models/Polygon';
import './Map.css';


(mapboxgl as any).accessToken=import.meta.env.VITE_REACT_APP_MAPBOX_ACCESS_TOKEN;


const Map: FC = () => {
  // Set up states for updating map 
  const mapContainer = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<{
    lng: number;
    lat: number;
    zoom: number;
  }>({
    lat: 45.3385364852744,
    lng: 42.50865653359858,
    zoom: 6
  });
  const { response, error, loading } = useAxios('field?lastChangeDate=2022-01-01T10:00:00.000&skip=0&take=100');

  	// Create map and lay over markers
  useEffect(() => {
    const { lat, lng, zoom } = state;
    if (!loading) {
      const map = mapContainer.current && new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12', 
        center: [lng, lat],
        zoom
      });

      map && map.on('load', () => {
        response.map((poligon) => ({
          ...poligon, Location: JSON.parse(poligon.Location)
        })).map((poligon) => {
          new Polygon(poligon, map).didMount().addLayers([poligon.$id, 'outline']);
          return;
        });
      })
    }
  }, [loading, mapContainer])


	return (
    <div>
      <div id='mapContainer' ref={mapContainer} style={{ width:'100%', height:'100vh' }}/>
    </div>
  );
    
}

export default Map;