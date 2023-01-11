class Poligon {
  owner: mapboxgl.Map | null = null;
  $id = '';
  Id = 0;
  Name = '';
  Size = 0;
  IsRemoved = false;
  SyncId = '';
  Location = {
    Center: [0, 0],
    Polygon: [[0]],
  };
  OrganizationId = 0;
  SyncDate = new Date();

  constructor(
    options = {
      $id: '',
      Id: 0,
      Name: '',
      Size: 0,
      IsRemoved: false,
      SyncId: '',
      Location: {
        Center: [0, 0],
        Polygon: [[0, 0]],
      },
      OrganizationId: 0,
      SyncDate: new Date(),
    },
    owner:  mapboxgl.Map,
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
    const source: mapboxgl.AnySourceData = {
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
        // Add a black outline around the polygon.
        this.owner?.addLayer({
          'id': `${layers[0]}-${layer}`,
          'type': 'line',
          'source': `${this.$id}_${this.Name}`,
          'layout': {},
          'paint': {
            'line-color': '#000',
            'line-width': 3
          }
        });
        return;
      }
      // Add a new layer to visualize the polygon.
      this.owner?.addLayer({
        'id': layer,
        'type': 'fill',
        'source': `${this.$id}_${this.Name}`, // reference the data source
        'layout': {},
        'paint': {
          'fill-color': '#f9a602', // blue color fill
          'fill-opacity': 0.4
        }
      })
    })
    return this;
  }

   
}

export default Poligon;
