import api from "./api";

export const getRolePermissions = () => api.get("RolePermissions/get-role-permissions");
export const addRolePermissions = (data) => api.post("RolePermissions/add-role-permissions", data);

export const deleteUsers = (roleId: number,permissionId:number) => api.delete(`Users/delete-role-permissions/${roleId},${permissionId}`);