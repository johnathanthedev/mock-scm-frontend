export interface RouteDto {
  id: string;
  name: string;
  facility_coordinates: {
    Lat: number;
    Lng: number;
  };
  vehicle_id: string;
  route_stops: Array<{
    id: string;
    route_id: string;
    facility_coordinates: {
      Lat: number;
      Lng: number;
    };
    sequence: number;
    CreatedAt: Date,
    UpdatedAt: Date
  }>;
  CreatedAt: Date,
  UpdatedAt: Date
}