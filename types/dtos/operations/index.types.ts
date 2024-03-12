export interface OperationDto {
  ID: string,
  Name: string,
  Status: OperationStatusName,
  Joined: boolean
}

export enum OperationStatusName {
  Active = "Active",
  Inactive = "Inactive"
}