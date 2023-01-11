type MapParams = {
  lng: number;
  lat: number;
  zoom: number;
}

type MapState = {
  params: MapParams;
  styles: MapSyle;
}

type MapSyle = {
  style: string;
}

export type { MapState, MapParams, MapSyle };
