type PolygonLocation = {
    Center: number[];
    Polygon: number[][];
};

type BasePolygonProps = {
    $id: string;
    Id: number;
    Name: string,
    Size: number;
    IsRemoved: boolean;
    SyncId: string;
    OrganizationId: number;
};

type RowPolygonProps = BasePolygonProps & {
    SyncDate: string;
    Location: string;
};

type PolygonProps = BasePolygonProps & {
    Location: PolygonLocation;
    SyncDate: Date;
};

export type { PolygonLocation, PolygonProps, RowPolygonProps };
