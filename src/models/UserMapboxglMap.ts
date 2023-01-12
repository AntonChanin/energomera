import mapboxgl from 'mapbox-gl';

import { PolygonProps } from '../types/polygon';
import PointCollection from './PointCollection';
import Polygon from './Polygon';

class UserMapboxglMap {
  mapContainer: HTMLDivElement | null = null;
  style:  string | mapboxgl.Style  = 'mapbox://styles/mapbox/satellite-streets-v12';
  center:  mapboxgl.LngLatLike = [0, 0];
  zoom = 0;

  points: any = {
      'type': 'FeatureCollection',
      "features": [],
  };
  self?: mapboxgl.Map;

  readonly labelPresset = {
    'fill': {
      'fill-color': 'green',
    },
    'line': {
      'line-color': '#000',
      'line-width': 3
    }
  };

  readonly fillFieldPresset = {
    'fill': {
      'fill-color': '#fff',
      'fill-opacity': 0.1
    },
    'line': {
      'line-color': '#fff',
      'line-width': 3
    }
  };


  constructor(options: {
      center: mapboxgl.LngLatLike,
      container: HTMLDivElement;
      style: string | mapboxgl.Style;
      zoom: number;
  }) {
      const { center, container, style, zoom } = options;
      
      this.mapContainer = container;
      this.style = style;
      this.center = center;
      this.zoom = zoom;
  };

  didMount() {
    if (this.mapContainer) {
      this.self = new mapboxgl.Map({
        container: this.mapContainer,
        style: this.style, 
        center: this.center,
        zoom: this.zoom,
      });
    };
    return this;
  };

  fillField(polygon: PolygonProps) {
    this && this.self && new Polygon(polygon, this.self)
      .didMount()
      .addLayers(this.fillFieldPresset);
    return this;
  }

  addLabel(polygon: PolygonProps) {
    this.makeLabelBackground(polygon)?.didMount().addLayers(this.labelPresset);
    this.addPoint(polygon);
    return this;
  }

  createPointCollection() {
    this.self  && new PointCollection({ points: this.points }, this.self)
      .didMount()
      .addLayers(['unclustered-text']);
    return this;
  }

  addPoint(
    source : PolygonProps
  ) {
    const { Name, Location: { Center } } = source;
      this.points.features.push({
      "type": "Feature",
      "properties": { "info_text": Name },
      "geometry": { "type": "Point", "coordinates": [ Center[0], Center[1] ] },
    });
  }

  private makeLabelBackground(polygon: PolygonProps) {
    return this && this.self && new Polygon({
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
    }, this.self);
  }
}

export default UserMapboxglMap;
