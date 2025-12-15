import api from "./api";

export const getClasses = (pageNumber: number, pageSize: number, search:string) => api.get("Classes",{params:{pageNumber,pageSize,search}});
export const addClasses = (data) => api.post("Classes", data);
export const updateClasses = (id: number, data: any) =>
  api.put(`Classes/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });
export const deteleClasses = (id:number) => api.delete(`Classes/${id}`)

