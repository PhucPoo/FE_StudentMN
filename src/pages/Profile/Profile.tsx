import { useEffect, useState } from "react";
import { getCurrentUser } from "@/service/authService";
import { getStudentById } from "@/service/studentService";
import ProfileAdmin from "./ProfileAdmin";
import ProfileStudent from "./ProfileStudent";

export default function Profile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetch() {
      const current = await getCurrentUser();

      if (current.role === "Student") {
        const student = await getStudentById(current.id);
        setUser({ ...current, ...student.data.data });
      } else {
        setUser(current);
      }
    }
    fetch();
  }, []);

  if (!user) return <p>Loading...</p>;

  if (user.role === "Admin") return <ProfileAdmin user={user} />;
  if (user.role === "Student") return <ProfileStudent user={user} />;

  return null;
}
