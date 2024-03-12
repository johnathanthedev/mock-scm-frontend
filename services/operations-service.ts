import { API_URL } from "@/config/constants";
import { getAccessToken } from "@/lib/client-helpers";

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