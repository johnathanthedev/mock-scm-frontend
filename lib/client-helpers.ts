export const setAccessToken = (token: string): void => {
  localStorage.setItem("username", token);
};

export const getAccessToken = (): string => {
  return localStorage.getItem("username") as string;
};

export const removeAccessToken = (): void => {
  localStorage.removeItem("username");
}
