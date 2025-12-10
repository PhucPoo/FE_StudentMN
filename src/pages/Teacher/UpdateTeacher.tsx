import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { notification } from "antd";

interface UpdateTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateSuccess: () => void;
  updateTeacherApi: (id: number, data: any) => Promise<any>;
  teacherData: any;
}

export default function UpdateteacherModal({
  isOpen,
  onClose,
  onUpdateSuccess,
  updateTeacherApi,
  teacherData,
}: UpdateTeacherModalProps) {
  const [formData, setFormData] = useState({
    avt: "",
    teacherCode: "",
    fullName: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    email: "",
    phoneNumber: "",
    userId: null,
  });

  useEffect(() => {
    if (teacherData) {
      const dob = teacherData.dateOfBirth
        ? new Date(teacherData.dateOfBirth).toISOString().split("T")[0]
        : "";
      setFormData({
        avt: teacherData.avt || "",
        teacherCode: teacherData.teacherCode || "",
        fullName: teacherData.fullName || "",
        dateOfBirth: dob,
        address: teacherData.address || "",
        gender: teacherData.gender || "",
        email: teacherData.email || "",
        phoneNumber: teacherData.phoneNumber || "",
        userId: teacherData.userId || null,
      });
    }
  }, [teacherData, isOpen]);

  const handleSubmit = async () => {
    try {
      const payload = {
        Avt: formData.avt,
        teacherCode: formData.teacherCode,
        FullName: formData.fullName,
        DateOfBirth: formData.dateOfBirth || null,
        Gender: formData.gender,
        Email: formData.email,
        PhoneNumber: formData.phoneNumber,
        Address: formData.address,
        UserId: formData.userId,
      };

      await updateTeacherApi(teacherData.id, payload);

      notification.success({
        title: "Thành công",
        description: "Cập nhật giảng viên thành công!",
        placement: "topRight",
      });
      onClose();
      onUpdateSuccess();
    } catch (error) {
      notification.error({
        title: "Lỗi",
        description: "Cập nhật giảng viên thất bại!",
        placement: "topRight",
      });
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Chỉnh sửa giảng viên</h2>

        <div className="space-y-4">
          <Input
            placeholder="Avatar URL"
            value={formData.avt}
            onChange={(e) => setFormData({ ...formData, avt: e.target.value })}
          />
          <Input
            placeholder="Mã giảng viên"
            value={formData.teacherCode}
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
