import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSuccess: () => void;
  addAccountApi: (data: any) => Promise<any>;
}

export default function AddAccountModal({
  isOpen,
  onClose,
  onAddSuccess,
  addAccountApi,
}: AddAccountModalProps) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
    roleId: "", 
  });

  const handleSubmit = async () => {
    try {
      await addAccountApi(formData);
      alert("Thêm tài khoản thành công!");
      onClose();
      onAddSuccess();
      setFormData({ username: "", password: "", fullName: "", email: "", roleId: "" }); 
    } catch (error) {
      alert("Lỗi thêm tài khoản!");
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
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          <Input
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <Input
            placeholder="Họ và tên"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
          <Input
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input
            placeholder="Role ID"
            value={formData.roleId}
            onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
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
