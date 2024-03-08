import { API_URL } from "@/config/constants";
import { SignInRequest } from "@/types/services/accountsService";

export const signIn = async (body: SignInRequest): Promise<any> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  return { data, status: response.status }
}