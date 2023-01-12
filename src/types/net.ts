import { RowPolygonProps } from './polygon';

type QueryParams = {
  lastChangeDate: string;
  skip: number;
  take: number;
}

type PolygonRequest = {
  response: RowPolygonProps[]
  error: string;
  loading: boolean;
}

export type { QueryParams, PolygonRequest };
