import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { notification, Select } from "antd";
import { getUsers } from "@/service/accountService";
import { addStudents } from "@/service/studentService";
import { Class, User } from "@/lib/interface";
import { getClasses } from "@/service/classService";
const { Option } = Select;

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSuccess: () => void;
}

export default function AddStudentModal({
  isOpen,
  onClose,
  onAddSuccess,
}: AddStudentModalProps) {
  const [formData, setFormData] = useState({
    avt: "",
    studentcode: "",
    fullName: "",
    dateOfBirth: "",
    address: "",
    gender: "",
    course: "",
    phoneNumber: "",
    userId: null,
    classId: null,
  });
  const [users, setUsers] = useState<User[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);

  const [page] = useState(1);
  const [pageSize] = useState(50);
  const [search] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchClasses();
  }, []);

  const fetchUsers = async () => {
    const res = await getUsers(page, pageSize, search);
    const filteredUsers = res.data.data.filter((u: any) => u.roleId === 2);
    setUsers(filteredUsers);
  };
  const fetchClasses = async () => {
    const res = await getClasses(page, pageSize, search);
    setClasses(res.data.data); // Lấy tất cả lớp
  };

  const handleSelectClass = (classId: string) => {
    setFormData({ ...formData, classId });
  };
  const handleSelectFullName = (fullName: string) => {
    const selected = users.find((u) => u.fullName === fullName);

    setFormData({
      ...formData,
      fullName,
      userId: selected?.id || null,
    });
  };

  const handleSelectEmail = (email: string) => {
    const selected = users.find((u) => u.email === email);

    setFormData({
      ...formData,
      fullName: selected?.fullName || "",
      userId: selected?.id || null,
    });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        dateOfBirth: formData.dateOfBirth
          ? new Date(formData.dateOfBirth).toISOString().split("T")[0]
          : null,
      };
      await addStudents(payload);
      notification.success({
        title: "Thành công",
        description: "Thêm tài khoản thành công!",
        placement: "topRight",
      });
      onClose();
      onAddSuccess();
      setFormData({ avt: "", studentcode: "", fullName: "", dateOfBirth: "", address: "", gender: "", course: "", phoneNumber: "", userId: null, classId: null });
    } catch (error) {
      notification.error({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi thêm tài khoản!",
        placement: "topRight",
      });
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Thêm tài khoản</h2>

        <div className="space-y-4">
          <Input
            placeholder="Ảnh đại diện"
            value={formData.avt}
            onChange={(e) => setFormData({ ...formData, avt: e.target.value })}
          />
          <Input
            placeholder="Mã sinh viên"
            value={formData.studentcode}
            onChange={(e) => setFormData({ ...formData, studentcode: e.target.value })}
          />


          <Select
            showSearch
            placeholder="-- Chọn họ và tên --"
            value={formData.fullName || undefined}
            onChange={(value) => handleSelectFullName(value)}
            style={{
              width: "100%",
              padding: "0.5rem 0.75rem",
              borderRadius: "0.375rem",
              border: "1px solid #d1d5db",
              backgroundColor: "#fff",
              fontSize: "1rem",
            }}

          >
            {users.map((u) => (
              <Option key={u.id} value={u.fullName}>
                {u.fullName}
              </Option>
            ))}
          </Select>

          <Input
            placeholder="Ngày sinh"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
          />
          <Input
            placeholder="Nơi ở"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
          <Select
            showSearch
            placeholder="-- Chọn giới tính --"
            value={formData.gender || undefined}
            onChange={(value) => setFormData({ ...formData, gender: value })}
            style={{
              width: "100%",
              padding: "0.5rem 0.75rem",
              borderRadius: "0.375rem",
              border: "1px solid #d1d5db",
              backgroundColor: "#fff",
              fontSize: "1rem",
            }}

          >
            <Option value="Nam">Nam</Option>
            <Option value="Nữ">Nữ</Option>
          </Select>

          <Input
            placeholder="Khóa"
            value={formData.course}
            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
          />

          <Input
            placeholder="Số điện thoại"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          />
          <Select
            showSearch
            placeholder="-- Chọn lớp --"
            value={formData.classId || undefined}
            onChange={(value) => handleSelectClass(value)}
            style={{
              width: "100%",
              padding: "0.5rem 0.75rem",
              borderRadius: "0.375rem",
              border: "1px solid #d1d5db",
              backgroundColor: "#fff",
              fontSize: "1rem",
            }}
          >
            {classes.map((cls) => (
              <Option key={cls.id} value={cls.id}>
                {cls.className}
              </Option>
            ))}
          </Select>
        </div>

        <div className="flex justify-end mt-6 gap-2">
          <Button variant="secondary" onClick={onClose}>Hủy</Button>
          <Button onClick={handleSubmit}>Lưu</Button>
        </div>
      </div>
    </div>
  );
}
