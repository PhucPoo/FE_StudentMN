import api from "./api";

export const getCourseSections = (pageNumber: number, pageSize: number, search:string) => api.get("CourseSections",{params:{pageNumber,pageSize,search}});
export const addCourseSections = (data) => api.post("CourseSections", data);
export const updateCourseSections = (id: number, data: any) =>
  api.put(`CourseSections/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });
export const deleteCourseSections = (id:number) => api.delete(`CourseSections/${id}`)