import { API_URL } from "@/config/constants";
import { CreateUserRequest, SignInRequest } from "@/types/services/accountsService";

export const signIn = async (body: SignInRequest): Promise<any> => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  return { data, status: response.status }
}

export const createUser = async (body: CreateUserRequest): Promise<any> => {
  const response = await fetch(`${API_URL}/users/create`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  return { data, status: response.status }
}