export interface Props {
  type: PanelTypeName;
  operationID: null | string;
}

export enum PanelTypeName {
  List = "List",
  OperationDetails = "OperationDetails"
}