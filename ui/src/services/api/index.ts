import apiClient from "./apiClient";

export const getClients = (uri: string): Promise<IClient[]> => {
  return apiClient.get<IClient[]>(uri);
};

export const createClient = (client: IClient): Promise<void> => {
  return apiClient.post<void>("client/create", client);
};

export const updateClient = (client: IClient): Promise<void> => {
  return apiClient.put<void>("clients", client);
};
