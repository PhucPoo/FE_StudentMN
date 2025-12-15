import api from "./api";

export const getPermissions = () => api.get("Permissions");
export const addPermissions = (data) => api.post("Permissions", data);
export const updatePermissions = (id: number, data: any) =>
  api.put(`Permissions/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });
export const detelePermissions = (id:number) => api.delete(`Permissions/${id}`)

