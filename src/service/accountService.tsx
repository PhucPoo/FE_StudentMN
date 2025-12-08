import api from "./api";

export const getUsers = (pageNumber: number, pageSize: number) => api.get("Users",{params:{pageNumber,pageSize}});
export const addUsers = (data) => api.post("Users", data);
export const updateUsers = (id: number, data: any) =>
  api.put(`Users/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });
export const deleteUsers = (id: number) => api.delete(`Users/${id}`);