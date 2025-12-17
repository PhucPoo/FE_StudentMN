import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { notification } from "antd";
import { updateStudents } from "@/service/studentService";

interface UpdateStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateSuccess: () => void;
  studentData: any;
}

export default function UpdateStudentModal({
  isOpen,
  onClose,
  onUpdateSuccess,
  studentData,
}: UpdateStudentModalProps) {
  const [formData, setFormData] = useState({
    avt: "",
    studentCode: "",
    fullName: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    email: "",
    phoneNumber: "",
    userId: null,
  });

  useEffect(() => {
    if (studentData) {
      const dob = studentData.dateOfBirth
        ? new Date(studentData.dateOfBirth).toISOString().split("T")[0]
        : "";
      setFormData({
        avt: studentData.avt || "",
        studentCode: studentData.studentCode || "",
        fullName: studentData.fullName || "",
        dateOfBirth: dob,
        address: studentData.address || "",
        gender: studentData.gender || "",
        email: studentData.email || "",
        phoneNumber: studentData.phoneNumber || "",
        userId: studentData.userId || null,
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
        Email: formData.email,
        PhoneNumber: formData.phoneNumber,
        Address: formData.address,
        UserId: formData.userId,
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
            placeholder="Email"
            type="email"
            value={formData.email}
            readOnly
            className="bg-gray-100 cursor-not-allowed"
          />
          <Input
            placeholder="Số điện thoại"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          />
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
