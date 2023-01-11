type PolygonLocation = {
    Center: number[];
    Polygon: number[][];
};

type PoligonProps = {
    $id: string;
    Id: number;
    Name: string,
    Size: number;
    IsRemoved: boolean;
    SyncId: string;
    Location: PolygonLocation;
    OrganizationId: number;
    SyncDate: Date;
}

export type { PolygonLocation, PoligonProps };
