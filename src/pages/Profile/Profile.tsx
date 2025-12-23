import { useEffect, useState } from "react";
import { getCurrentUser } from "@/service/authService";
import { getStudentById } from "@/service/studentService";
import ProfileAdmin from "./ProfileAdmin";
import ProfileStudent from "./ProfileStudent";
import ProfileTeacher from "./ProfileTeacher";
import { getTeacherById } from "@/service/teacherService";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [student, setStudent] = useState<any>(null);
  
  const [teacher, setTeacher] = useState<any>(null);

  useEffect(() => {
    async function fetch() {
      const current = await getCurrentUser();
      setUser(current);

      if (current.role === "Student") {
        const res = await getStudentById(current.id);
        setStudent(res.data.data);
      }
    }

    fetch();
  }, []);
   useEffect(() => {
    async function fetch() {
      const current = await getCurrentUser();
      setUser(current);

      if (current.role === "Teacher") {
        const res = await getTeacherById(current.id);
        setTeacher(res.data.data);
      }
    }

    fetch();
  }, []);

  if (!user) return <p>Loading...</p>;

  if (user.role === "Admin") {
    return <ProfileAdmin user={user} />;
  }

  if (user.role === "Student") {
    if (!student) return <p>Loading student...</p>;
    return <ProfileStudent  />;
  }
  if (user.role === "Teacher") {
    if (!teacher) return <p>Loading teacher...</p>;
    return <ProfileTeacher  />;
  }

  return null;
}
