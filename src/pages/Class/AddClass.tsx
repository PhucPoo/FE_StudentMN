import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { notification } from "antd";

interface AddClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSuccess: () => void;
  addClassApi: (data: any) => Promise<any>;
}

export default function AddClassModal({
  isOpen,
  onClose,
  onAddSuccess,
  addClassApi,
}: AddClassModalProps) {
  const [formData, setFormData] = useState({
    ClassName: "",
    description: "",
  });

  const handleSubmit = async () => {
    if (!formData.ClassName.trim()) {
      notification.warning({
        title: "Cảnh báo",
        description: "Tên lớp không được để trống",
        placement: "topRight",
      });
      return;
    }

    try {
      const payload = {
        ClassName: formData.ClassName,
        Description: formData.description,
      };

      await addClassApi(payload);

      notification.success({
        title: "Thành công",
        description: "Thêm lớp thành công!",
        placement: "topRight",
      });

      setFormData({ ClassName: "", description: "" });
      onAddSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      notification.error({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi thêm lớp!",
        placement: "topRight",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Thêm lớp</h2>

        <div className="space-y-4">
          <Input
            placeholder="Tên lớp"
            value={formData.ClassName}
            onChange={(e) =>
              setFormData({ ...formData, ClassName: e.target.value })
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
