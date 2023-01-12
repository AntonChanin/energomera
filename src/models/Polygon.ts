import { MapboxglSource, MapboxglMap } from '../types/mapboxgl';
import { PolygonProps, PolygonLocation } from '../types/polygon';

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
    options: PolygonProps = {
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

  addLayers(layers: Record<'line' | 'fill', Record<string, string | number>>) {
    const layersKeys = Object.keys(layers) as ('line' | 'fill')[]
    layersKeys.forEach((layerKey) => {
      if (layerKey === 'line') {
        this.owner?.addLayer({
          'id': `${this.$id}-${layerKey}`,
          'type': layerKey,
          'source': `${this.$id}_${this.Name}`,
          'layout': {},
          'paint': layers[layerKey],
        });
        return;
      }

      this.owner?.addLayer({
        'id': this.$id,
        'type': layerKey, //'fill',
        'source': `${this.$id}_${this.Name}`,
        'layout': {},
        'paint': layers[layerKey],
      })
    })
    return this;
  }
   
}

export default Polygon;
