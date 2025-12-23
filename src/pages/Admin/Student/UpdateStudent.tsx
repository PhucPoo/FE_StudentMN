import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { notification, Select } from "antd";
import { updateStudents } from "@/service/studentService";
import { Class, Student } from "@/lib/interface";
import { getClasses } from "@/service/classService";
const { Option } = Select;

interface UpdateStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateSuccess: () => void;
  studentData: Student;
}

export default function UpdateStudentModal({
  isOpen,
  onClose,
  onUpdateSuccess,
  studentData,
}: UpdateStudentModalProps) {
  const [classes, setClasses] = useState<Class[]>([]);
  const [page] = useState(1);
  const [pageSize] = useState(50);
  const [search] = useState("");
  const [formData, setFormData] = useState({
    avt: "",
    studentCode: "",
    fullName: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    course: "",
    phoneNumber: "",
    userId: null,
    classId: null,
    class:null,
  });
  useEffect(() => {
      fetchClasses();
    }, []);
  
   
    const fetchClasses = async () => {
      const res = await getClasses(page, pageSize, search);
      setClasses(res.data.data); // Lấy tất cả lớp
    };

  useEffect(() => {
    if (studentData) {
      const dob = studentData.dateOfBirth
        ? new Date(studentData.dateOfBirth).toISOString().split("T")[0]
        : "";
      setFormData({
        avt: studentData.avt || "",
        studentCode: studentData.studentCode || "",
        fullName: studentData.user.fullName || "",
        dateOfBirth: dob,
        address: studentData.address || "",
        gender: studentData.gender || "",
        course: studentData.course || "",
        phoneNumber: studentData.phoneNumber || "",
        userId: studentData.userId || null,
        classId: studentData.classId || null,
        class: studentData.class.className || null,
      });
    }
  }, [studentData, isOpen]);

  const handleSubmit = async () => {
    try {
      const payload = {
        Avt: formData.avt,
        StudentCode: formData.studentCode,
        FullName: formData.fullName,
        DateOfBirth: formData.dateOfBirth || null,
        Gender: formData.gender,
        Course: formData.course,
        PhoneNumber: formData.phoneNumber,
        Address: formData.address,
        UserId: formData.userId,
        ClassId: formData.classId,
        Class: formData.class.className,
      };

      await updateStudents(studentData.id, payload);

      notification.success({
        title: "Thành công",
        description: "Cập nhật sinh viên thành công!",
        placement: "topRight",
      });
      onClose();
      onUpdateSuccess();
    } catch (error) {
      notification.error({
        title: "Lỗi",
        description: "Cập nhật sinh viên thất bại!",
        placement: "topRight",
      });
      console.error(error);
    }
  };

  if (!isOpen) return null;
  const handleSelectClass = (classId: string) => {
    setFormData({ ...formData, classId });
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Chỉnh sửa sinh viên</h2>

        <div className="space-y-4">
          <Input
            placeholder="Avatar URL"
            value={formData.avt}
            onChange={(e) => setFormData({ ...formData, avt: e.target.value })}
          />
          <Input
            placeholder="Mã sinh viên"
            value={formData.studentCode}
            readOnly
            className="bg-gray-100 cursor-not-allowed"
          />
          <Input
            placeholder="Họ và tên"
            value={formData.fullName}
            readOnly
            className="bg-gray-100 cursor-not-allowed"
          />
          <Input
            placeholder="Ngày sinh"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
          />
          <Input
            placeholder="Giới tính"
            value={formData.gender}
            readOnly
            className="bg-gray-100 cursor-not-allowed"
          />
          <Input
            placeholder="Course"
            value={formData.course}
            readOnly
            className="bg-gray-100 cursor-not-allowed"
          />
          <Input
            placeholder="Số điện thoại"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          />
          <Select
            showSearch
            placeholder="-- Chọn lớp --"
            value={formData.class || undefined}
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
          <Button variant="secondary" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleSubmit}>Lưu</Button>
        </div>
      </div>
    </div>
  );
}
