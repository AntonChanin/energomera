import { PolygonProps } from './polygon';

type QueryParams = {
  lastChangeDate: string;
  skip: number;
  take: number;
}

type PolygonRequest = {
  response: PolygonProps[]
  error: string;
  loading: boolean;
}

export type { QueryParams, PolygonRequest };
