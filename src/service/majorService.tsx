import api from "./api";

export const getMajors = (pageNumber: number, pageSize: number, search:string) => api.get("Majors",{params:{pageNumber,pageSize,search}});
export const addMajors = (data) => api.post("Majors", data);
export const updateMajors = (id: number, data: any) =>
  api.put(`Majors/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });
export const deteleMajors = (id:number) => api.delete(`Majors/${id}`)

