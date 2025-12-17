import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { notification } from "antd";
import { updateMajors } from "@/service/majorService";

interface UpdateMajorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateSuccess: () => void;
  MajorData: any;
}

export default function UpdateMajorModal({
  isOpen,
  onClose,
  onUpdateSuccess,
  MajorData,
}: UpdateMajorModalProps) {
  const [formData, setFormData] = useState({
    majorname: "",
    desciption: "",
  });

  useEffect(() => {
    if (MajorData) {
      setFormData({
        majorname: MajorData.majorname || "",
        desciption: MajorData.desciption || "",
      });
    }
  }, [MajorData, isOpen]);

  const handleSubmit = async () => {
    try {
      const payload = {
        MajorName: formData.majorname,
        Desciption: formData.desciption,
      };

      await updateMajors(MajorData.id, payload);

      notification.success({
        title: "Thành công",
        description: "Cập nhật chuyên ngành thành công!",
        placement: "topRight",
      });
      onClose();
      onUpdateSuccess();
    } catch (error) {
      notification.error({
        title: "Lỗi",
        description: "Cập nhật chuyên ngành thất bại!",
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
            value={formData.majorname}
            onChange={(e) => setFormData({ ...formData, majorname: e.target.value })}
          />
          <Input
            placeholder="Mô tả"
            value={formData.desciption}
            onChange={(e) => setFormData({ ...formData, desciption: e.target.value })}
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
