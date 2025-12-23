import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { notification, Select } from "antd";
import { addSubjects } from "@/service/subjectService";
import { getMajors } from "@/service/majorService";

const { Option } = Select;

interface AddSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSuccess: () => void;
}

export default function AddSubjectModal({
  isOpen,
  onClose,
  onAddSuccess,
}: AddSubjectModalProps) {
  const [majors, setMajors] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    subjectCode: "",
    subjectName: "",
    credits: "",
    majorId: null,
  });

  // Load majors khi modal mở
  useEffect(() => {
    if (isOpen) {
      loadMajors();
    }
  }, [isOpen]);

  const loadMajors = async () => {
    try {
      const res = await getMajors(1, 100, "");
      setMajors(res.data.data);
    } catch (error) {
      console.error("Lỗi load majors:", error);
    }
  };

  const handleSelectMajor = (majorId: number) => {
    setFormData({
      ...formData,
      majorId: majorId,
    });
  };

  const handleSubmit = async () => {
    if (!formData.subjectName.trim()) {
      notification.warning({
        title: "Cảnh báo",
        description: "Tên môn học không được để trống",
      });
      return;
    }

    try {
      const payload = {
        subjectCode: formData.subjectCode,
        subjectName: formData.subjectName,
        credits: Number(formData.credits),
        majorId: formData.majorId,
      };

      await addSubjects(payload);

      notification.success({
        title: "Thành công",
        description: "Thêm môn học thành công!",
      });

      setFormData({ subjectCode: "", subjectName: "", credits: "", majorId: null });
      onAddSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      notification.error({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi thêm môn học!",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Thêm môn học</h2>

        <div className="space-y-4">
          <Input
            placeholder="Mã môn học"
            value={formData.subjectCode}
            onChange={(e) => setFormData({ ...formData, subjectCode: e.target.value })}
          />
          <Input
            placeholder="Tên môn học"
            value={formData.subjectName}
            onChange={(e) => setFormData({ ...formData, subjectName: e.target.value })}
          />
          <Input
            placeholder="Tín chỉ"
            type="number"
            value={formData.credits}
            onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
          />
          <Select
            showSearch
            placeholder="Chọn chuyên ngành"
            value={formData.majorId || undefined}
            onChange={(value) => handleSelectMajor(value)}
            style={{
              width: "100%",
              padding: "0.5rem 0.75rem",
              borderRadius: "0.375rem",
              border: "1px solid #d1d5db",
              backgroundColor: "#fff",
              fontSize: "1rem",
            }}
          >
            {majors.map((u) => (
              <Option key={u.id} value={u.id}>
                {u.majorName}
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
