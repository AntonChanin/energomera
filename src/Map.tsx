import React, { FC, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import useAxios from './hooks/useAxios';
import Poligon from './models/poligon';


(mapboxgl as any).accessToken=import.meta.env.VITE_REACT_APP_MAPBOX_ACCESS_TOKEN;


const Map: FC = () => {
  // Set up states for updating map 
  const [mapContainer, setMapContainer] = useState<HTMLDivElement  | null>();
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
    const map = new mapboxgl.Map({
			container: mapContainer ?? 'mapContainer',
			style: 'mapbox://styles/mapbox/satellite-streets-v12', 
			center: [lng, lat],
			zoom
		});

    map.on('load', () => {
      !loading && response.map((poligon) => ({
        ...poligon, Location: JSON.parse(poligon.Location)
      })).map((poligon) => {
        new Poligon(poligon, map).didMount().addLayers([poligon.$id, 'outline']);
        return;
      });
    })
  }, [loading])


	return (
    <div>
      <div id='mapContainer' ref={el => setMapContainer(el) } style={{ width:'100%', height:'100vh' }}/>
    </div>
  );
    
}

export default Map;