import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {  notification } from "antd";

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSuccess: () => void;
  addStudentApi: (data: any) => Promise<any>;
}

export default function AddStudentModal({
  isOpen,
  onClose,
  onAddSuccess,
  addStudentApi,
}: AddStudentModalProps) {
  const [formData, setFormData] = useState({
    avt: "",
    studentcode: "",
    fullName: "",
    dob: "",
    gender: "", 
    email: "",
    phoneNumber: "",
  });

  const handleSubmit = async () => {
    try {
      await addStudentApi(formData);
      notification.success({
        title: "Thành công",
        description: "Thêm tài khoản thành công!",
        placement: "topRight",
      });
      onClose();
      onAddSuccess();
      setFormData({ avt: "", studentcode: "", fullName: "", dob: "", gender: "", email: "", phoneNumber: "" }); 
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
          placeholder="Avatar URL"
          value={formData.avt}
          onChange={(e) => setFormData({ ...formData, avt: e.target.value })}
        />
        <Input
          placeholder="Mã sinh viên"
          value={formData.studentcode}
          onChange={(e) => setFormData({ ...formData, studentcode: e.target.value })}
        />
        <Input
          placeholder="Họ và tên"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        />
        <Input
          placeholder="Ngày sinh"
          type="date"
          value={formData.dob}
          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
        />
        <Input
          placeholder="Giới tính"
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        />
        <Input
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input
          placeholder="Số điện thoại"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
        />
      </div>

      <div className="flex justify-end mt-6 gap-2">
        <Button variant="secondary" onClick={onClose}>Hủy</Button>
        <Button onClick={handleSubmit}>Lưu</Button>
      </div>
    </div>
  </div>
  );
}
