import { MapboxglMap, MapboxglSource } from '../types/mapboxgl';

class PointCollection {
  points: any;
  owner:  MapboxglMap | null = null;
  readonly preset: Record<'unclustered-point' | 'unclustered-text', any> = {
    'unclustered-point': {
      id: 'unclustered-point',
      type: 'circle',
      source: 'earthquakes',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#11b4da',
        'circle-radius': 10,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff'
      }
    },
    'unclustered-text': {
      id: 'unclustered-text',
      type: 'symbol',
      source: 'earthquakes',
      layout: {
        'text-field': ['get', 'info_text'],
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
      }
    }
  }

  constructor(options: { points: any }, owner: MapboxglMap) {
    const { points } = options;
    this.points = points;
    this.owner = owner;
  }
  
  didMount() {
    const source: MapboxglSource =  {
      type: 'geojson',
      data: this.points,
      clusterMaxZoom: 14,
      clusterRadius: 50
    };

    this.owner?.addSource('earthquakes', source);
    return this;
  }

  addLayers(layers: ('unclustered-point' | 'unclustered-text')[]) {
    layers.forEach((layer) => {
      this.owner?.addLayer(this.preset[layer]);
      return;
    })
    return this;
  }
}

export default PointCollection;
