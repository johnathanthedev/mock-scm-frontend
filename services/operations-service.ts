import { API_URL } from "@/config/constants";
import { getAccessToken } from "@/lib/client-helpers";
import { OperationDto } from "@/types/services/operations-service.types";

export const getOperationsList = async () => {
  const accessToken = getAccessToken();

  const response = await fetch(`${API_URL}/operations/list`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    },
  });

  const data = await response.json();

  return { data, status: response.status }
}

export const getOperation = async (operationID: string): Promise<any> => {
  const accessToken = getAccessToken();

  const response = await fetch(`${API_URL}/operations/get`, {
    method: "POST",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken
    },
    body: JSON.stringify({
      operation_id: operationID
    }),
  });

  const data: Promise<OperationDto> = await response.json();

  return { data, status: response.status }
}