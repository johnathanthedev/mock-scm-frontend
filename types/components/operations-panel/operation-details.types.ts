import { classnameType } from "../generic.types";

export interface Props {
  goBack: () => void;
  className?: classnameType;
  operationID: null | string;
}