import { API_URL } from "@/config/constants";
import { getAccessToken } from "@/lib/client-helpers";
import { RouteDto } from "@/types/services/routes-service.types";

export const listRoutes = async (operationID: string): Promise<any> => {
  const accessToken = getAccessToken();

  const response = await fetch(`${API_URL}/routes/list`, {
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

  const data: Promise<RouteDto> = await response.json();

  return { data, status: response.status }
}