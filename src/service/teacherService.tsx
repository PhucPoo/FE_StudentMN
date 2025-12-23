import api from "./api";

export const getTeachers = (pageNumber: number, pageSize: number, search:string) => api.get("Teachers",{params:{pageNumber,pageSize,search}});
export const addTeachers = (data) => api.post("Teachers", data);
export const updateTeachers = (id: number, data: any) =>
  api.put(`Teachers/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });
export const deteleTeachers = (id:number) => api.delete(`Teachers/${id}`)

export const getTeacherById=(id: number)  => api.get(`Teachers/by-id/${id}`);