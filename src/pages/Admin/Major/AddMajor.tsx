import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { notification } from "antd";
import { addMajors } from "@/service/majorService";

interface AddMajorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSuccess: () => void;
}

export default function AddMajorModal({
  isOpen,
  onClose,
  onAddSuccess,
}: AddMajorModalProps) {
  const [formData, setFormData] = useState({
    majorName: "",
    description: "",
  });

  const handleSubmit = async () => {
    if (!formData.majorName.trim()) {
      notification.warning({
        title: "Cảnh báo",
        description: "Tên chuyên ngành không được để trống",
        placement: "topRight",
      });
      return;
    }

    try {
      const payload = {
        MajorName: formData.majorName,
        Description: formData.description,
      };

      await addMajors(payload);

      notification.success({
        title: "Thành công",
        description: "Thêm chuyên ngành thành công!",
        placement: "topRight",
      });

      setFormData({ majorName: "", description: "" });
      onAddSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      notification.error({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi thêm chuyên ngành!",
        placement: "topRight",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Thêm chuyên ngành</h2>

        <div className="space-y-4">
          <Input
            placeholder="Tên chuyên ngành"
            value={formData.majorName}
            onChange={(e) =>
              setFormData({ ...formData, majorName: e.target.value })
            }
          />
          <Input
            placeholder="Mô tả"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
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
