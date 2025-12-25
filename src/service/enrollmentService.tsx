import api from "./api";

export const getEnrollments = (pageNumber: number, pageSize: number, search:string) => api.get("Enrollments",{params:{pageNumber,pageSize,search}});
export const addEnrollments = (data) => api.post("Enrollments", data);
export const updateEnrollments = (id: number, data: any) =>
  api.put(`Enrollments/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });
export const deleteEnrollments = (id:number) => api.delete(`Enrollments/${id}`)