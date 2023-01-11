import { MapboxglSource, MapboxglMap } from '../types/mapboxgl';
import { PoligonProps, PolygonLocation } from '../types/polygon';

class Polygon {
  owner: MapboxglMap | null = null;
  $id = '';
  Id = 0;
  Name = '';
  Size = 0;
  IsRemoved = false;
  SyncId = '';
  Location: PolygonLocation = {
    Center: [],
    Polygon: [],
  };
  OrganizationId = 0;
  SyncDate = new Date();

  constructor(
    options: PoligonProps = {
      $id: '',
      Id: 0,
      Name: '',
      Size: 0,
      IsRemoved: false,
      SyncId: '',
      Location: {
        Center: [0, 0],
        Polygon: [[0, 0], [-1, -1], [1, 1]],
      },
      OrganizationId: 0,
      SyncDate: new Date(),
    },
    owner:  MapboxglMap,
  ) {
    const { $id, Id, Name, Size, IsRemoved, SyncId, Location, OrganizationId, SyncDate } = options;
    this.$id = $id;
    this.Id = Id;
    this.Name = Name;
    this.Size = Size;
    this.IsRemoved = IsRemoved;
    this.SyncId = SyncId;
    this.Location = Location;
    this.OrganizationId = OrganizationId;
    this.SyncDate = SyncDate;
    this.owner = owner;
  }

  didMount() {
    const source: MapboxglSource = {
      'type': 'geojson',
      'data': {
        'type': 'Feature',
        'properties': { 'maxClusterZoom': 12, 'name': this.Name },
        'geometry': {
          'type': 'Polygon',
          'coordinates': [ this.Location.Polygon?.map((cord) => (cord?.reverse())) ],
        }
      }
    };

    this.Location.Polygon && this.owner?.addSource(`${this.$id}_${this.Name}`, source);
    return this;
  }

  addLayers(layers: string[]) {
    layers.forEach((layer) => {
      if (layer === 'outline') {
        this.owner?.addLayer({
          'id': `${layers[0]}-${layer}`,
          'type': 'line',
          'source': `${this.$id}_${this.Name}`,
          'layout': {},
          'paint': {
            'line-color': '#fff',
            'line-width': 3
          }
        });
        return;
      }

      this.owner?.addLayer({
        'id': layer,
        'type': 'fill',
        'source': `${this.$id}_${this.Name}`,
        'layout': {},
        'paint': {
          'fill-color': '#fff',
          'fill-opacity': 0.1
        }
      })
    })
    return this;
  }
   
}

export default Polygon;
