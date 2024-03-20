import { classnameType } from "./generic.types";

export interface Props {
  operationID: null | string;
  onClick: (operationID: string) => void;
  className?: classnameType;
}