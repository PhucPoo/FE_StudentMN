import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { notification } from "antd";
import { addRolePermissions, getRolePermissions } from "@/service/decentralizationService";
import { MainLayout } from "@/components/layout/MainLayout";

interface Permission {
  id: number;
  permissionName: string;
  description: string;
  isAssigned: boolean;
}

interface RolePermissions {
  roleId: number;
  roleName: string;
  permissions: Permission[];
}

export default function DecentralizationPage() {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [roles, setRoles] = useState<RolePermissions[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRolePermissions();
        setRoles(res.data);
      } catch (error) {
        notification.error({ title: "Lỗi", description: "Không tải được dữ liệu quyền" });
      }
    };
    fetchData();
  }, []);

  const toggleMenu = (roleId: number) => {
    setOpenMenu(openMenu === roleId ? null : roleId);
  };

  const handleCheckboxChange = (role: RolePermissions, perm: Permission) => {
    if (!isEditing) return;
    if (role.roleName.toLowerCase() === "admin") return; // Admin luôn full quyền

    setRoles((prev) =>
      prev.map((r) =>
        r.roleId === role.roleId
          ? {
              ...r,
              permissions: r.permissions.map((p) =>
                p.id === perm.id ? { ...p, isAssigned: !p.isAssigned } : p
              ),
            }
          : r
      )
    );
  };

  const handleSave = async () => {
    try {
      for (const role of roles) {
        if (role.roleName.toLowerCase() === "admin") continue; // Admin luôn full quyền

        const permissionIds = role.permissions
          .filter((p) => p.isAssigned)
          .map((p) => p.id);

        await addRolePermissions({ roleId: role.roleId, PermissionIds: permissionIds });
      }
      notification.success({ title: "Thành công", description: "Cập nhật quyền thành công" });
      setIsEditing(false);
    } catch (error) {
      notification.error({ title: "Lỗi", description: "Cập nhật quyền thất bại" });
    }
  };

  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Phân quyền</h1>

        {roles.map((role) => (
          <div key={role.roleId} className="mb-4 border rounded-lg">
            <button
              onClick={() => toggleMenu(role.roleId)}
              className="flex w-full items-center justify-between px-4 py-2 bg-gray-100 hover:bg-gray-200 font-medium"
            >
              {role.roleName}
              {openMenu === role.roleId ? <ChevronUp /> : <ChevronDown />}
            </button>

            {openMenu === role.roleId && (
              <div className="px-6 py-4 space-y-2">
                {role.permissions.map((perm) => (
                  <label key={perm.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={perm.isAssigned}
                      onChange={() => handleCheckboxChange(role, perm)}
                      className="w-4 h-4"
                      disabled={!isEditing || role.roleName.toLowerCase() === "admin"}
                    />
                    <div>
                      <span className="font-medium">{perm.permissionName}</span>{" "}
                      <span className="text-gray-500 text-sm">{perm.description}</span>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="mt-6 flex gap-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Sửa
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Lưu
            </button>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
