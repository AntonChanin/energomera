import React, { FC, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';


(mapboxgl as any).accessToken=import.meta.env.VITE_REACT_APP_MAPBOX_ACCESS_TOKEN ?? 'pk.eyJ1IjoiYW50b24taGFuaW4iLCJhIjoiY2szaDd6c2JwMDdlbTNkcGg2bTFvdzBheiJ9.qDd64OW7F78wdHWwTzsuAA';


const Map: FC = () => {
  // Set up states for updating map 
  const [mapContainer, setMapContainer] = useState<HTMLDivElement  | null>();
  const [state, setState] = useState<{
    lng: number;
    lat: number;
    zoom: number;
  }>({
    lng: 45.3385364852744,
    lat: 42.50865653359858,
    zoom: 6
  });

  	// Create map and lay over markers
  useEffect(() => {
    const { lat, lng, zoom } = state;
    const map = new mapboxgl.Map({
			container: mapContainer ?? 'mapContainer',
			style: 'mapbox://styles/mapbox/outdoors-v12', 
			center: [lng, lat],
			zoom
		})
    

    map.on('load', () => {
      map.addSource('maine', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'Polygon',
            // These coordinates outline Maine.
            'coordinates': [
              [
                [45.35070610422417,42.51055999934353],
                [45.3462291385811,42.51076921163542],
                [45.34622348324605,42.51110180551306],
                [45.33971381409724,42.5112895601451],
                [45.33970061679712,42.511048161338515],
                [45.32660171351543,42.51161410743942],
                [45.32652062558647,42.506525956943406],
                [45.3506439004275,42.50578834947862]
              ]
            ]
          }
        }
      });
        
      // Add a new layer to visualize the polygon.
      map.addLayer({
        'id': 'maine',
        'type': 'fill',
        'source': 'maine', // reference the data source
        'layout': {},
        'paint': {
          'fill-color': '#0080ff', // blue color fill
          'fill-opacity': 0.5
        }
      });
      // Add a black outline around the polygon.
      map.addLayer({
        'id': 'outline',
        'type': 'line',
        'source': 'maine',
        'layout': {},
        'paint': {
          'line-color': '#000',
          'line-width': 3
        }
      });
    });
  }, [])

	// Create map and lay over markers

	return (
    <div>
      <div id='mapContainer' ref={el => setMapContainer(el) } style={{ width:'100%', height:'100vh' }}/>
    </div>
  );
    
}

export default Map;