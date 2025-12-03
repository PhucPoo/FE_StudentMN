import api from "./api";

export const getStudents = () => api.get("/Students");
export const addStudent = (data) => api.post("/Students", data);
export const updateStudent = (data) => api.put("/Students", data)
export const deteleStudent = (data) => api.delete("/Students", data)