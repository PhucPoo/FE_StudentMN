import api from "./api";

export const getStudents = (pageNumber: number, pageSize: number, search:string) => api.get("Students",{params:{pageNumber,pageSize,search}});
export const addStudents = (data) => api.post("Students", data);
export const updateStudents = (id: number, data: any) =>
  api.put(`Students/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });
export const deteleStudents = (id:number) => api.delete(`Students/${id}`)

export const getStudentByUserId=(userId: number)  => api.get(`Students/by-user/${userId}`);