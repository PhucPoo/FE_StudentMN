
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { notification, Select } from "antd";
import { getClasses, updateClasses } from "@/service/classService";
import { Class } from "@/lib/interface";
import { getTeachers } from "@/service/teacherService";
import { getMajors } from "@/service/majorService";
const { Option } = Select;
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
  const [classes, setClasses] = useState<Class[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [majors, setMajors] = useState<any[]>([]);
  const [page] = useState(1);
  const [pageSize] = useState(50);
  const [search] = useState("");

  const [formData, setFormData] = useState({
    classId: null,
    courseYear: "",
    teacherId: null,
    majorId: null,
    className: "",
  });
  useEffect(() => {
    fetchAPI();
  }, []);
  const fetchAPI = async () => {
  const classRes = await getClasses(page, pageSize, search);
  const teacherRes = await getTeachers(page, pageSize, search);
  const majorRes = await getMajors(page, pageSize, search);

  setClasses(classRes.data.data);
  setTeachers(teacherRes.data.data);
  setMajors(majorRes.data.data);
};

  useEffect(() => {
    if (ClassData) {
      setFormData({
        classId: ClassData.classId || "",
        courseYear: ClassData.courseYear || "",
        teacherId: ClassData.teacherId || null,
        majorId: ClassData.majorId || null,
        className: ClassData.className || "",
      });
    }
  }, [ClassData, isOpen]);

  const handleSubmit = async () => {
    try {
      const payload = {
        ClassId: formData.classId,
        CourseYear: formData.courseYear,
        TeacherId: formData.teacherId,
        MajorId: formData.majorId,
      };


      await updateClasses(formData.classId, payload);


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
  const handleSelectClass = (classId: string) => {
    setFormData({ ...formData, classId});
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Chỉnh sửa lớp học</h2>

        <div className="space-y-4">
          <Input
            placeholder="Lớp học"
            value={formData.className}
            readOnly
            className="bg-gray-100 cursor-not-allowed"
          />
          <Input
            placeholder="Khóa học"
            value={formData.courseYear}
            onChange={(e) => setFormData({ ...formData, courseYear: e.target.value })}
          />
          <Select
            showSearch
            placeholder="-- Chọn giáo viên --"
            value={formData.teacherId || undefined}
            onChange={(value) => setFormData({ ...formData, teacherId: value })}
            style={{
              width: "100%",
              padding: "0.5rem 0.75rem",
              borderRadius: "0.375rem",
              border: "1px solid #d1d5db",
              backgroundColor: "#fff",
              fontSize: "1rem",
            }}
          >
            {teachers.map((teacher) => (
              <Option key={teacher.id} value={teacher.id}>
                {teacher.user?.fullName}
              </Option>
            ))}
          </Select>
          <Select
            showSearch
            placeholder="-- Chọn chuyên ngành --"
            value={formData.majorId || undefined}
            onChange={(value) => setFormData({ ...formData, majorId: value })}
            style={{
              width: "100%",
              padding: "0.5rem 0.75rem",
              borderRadius: "0.375rem",
              border: "1px solid #d1d5db",
              backgroundColor: "#fff",
              fontSize: "1rem",
            }}
          >
            {majors.map((major) => (
              <Option key={major.id} value={major.id}>
                {major.majorName}
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
