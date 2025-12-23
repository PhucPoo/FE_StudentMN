import api from "./api";

export const getSubjects = (pageNumber: number, pageSize: number, search:string) => api.get("Subject",{params:{pageNumber,pageSize,search}});
export const addSubjects = (data) => api.post("Subject", data);
export const updateSubjects = (id: number, data: any) =>
  api.put(`Subject/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });
export const deteleSubjects = (id:number) => api.delete(`Subject/${id}`)

