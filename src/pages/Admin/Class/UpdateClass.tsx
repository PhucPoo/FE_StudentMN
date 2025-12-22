
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { notification } from "antd";
import { updateClasses } from "@/service/classService";

interface UpdateClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateSuccess: () => void;
  ClassData: any;
}

export default function UpdateClassModal({
  isOpen,
  onClose,
  onUpdateSuccess,
  ClassData,
}: UpdateClassModalProps) {
  const [formData, setFormData] = useState({
    className: "",
    courseYear: "",
    teacher:null,
    major:null,
  });

  useEffect(() => {
    if (ClassData) {
      setFormData({
        className: ClassData.className || "",
        courseYear: ClassData.courseYear || "",
        teacher:ClassData.teacher || null,
        major:ClassData.major || null,
      });
    }
  }, [ClassData, isOpen]);

  const handleSubmit = async () => {
    try {
      const payload = {
        ClassName: formData.className,
        CourseYear: formData.courseYear,
        TeacherId: formData.teacher,
        MajorId: formData.major,
      };
       

      await updateClasses(ClassData.id, payload);

      notification.success({
        title: "Thành công",
        description: "Cập nhật lớp học thành công!",
        placement: "topRight",
      });
      onClose();
      onUpdateSuccess();
    } catch (error) {
      notification.error({
        title: "Lỗi",
        description: "Cập nhật lớp học thất bại!",
        placement: "topRight",
      });
      console.error(error);
    }
  };

  if (!isOpen) return null;
 
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Chỉnh sửa chuyên ngành</h2>

        <div className="space-y-4">
          <Input
            placeholder="tên chuyên ngành"
            value={formData.className}
            onChange={(e) => setFormData({ ...formData, className: e.target.value })}
          />
          <Input
            placeholder="Khóa học"
            value={formData.courseYear}
            onChange={(e) => setFormData({ ...formData, courseYear: e.target.value })}
          />
          <Input
            placeholder="Giáo viên"
            value={formData.teacher?.user?.fullName ?? ""}
            readOnly
            className="bg-gray-100 cursor-not-allowed"
          />
          <Input
            placeholder="Chuyên ngành"
            value={formData.major?.majorName ?? ""}
            readOnly
            className="bg-gray-100 cursor-not-allowed"
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
