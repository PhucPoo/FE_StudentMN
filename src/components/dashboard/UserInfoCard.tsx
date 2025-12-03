interface UserInfoCardProps {
  name: string;
  role: string;
  currentClass: string;
}

export function UserInfoCard({ name, role, currentClass }: UserInfoCardProps) {
  return (
    <div className="rounded-lg bg-card p-6 card-shadow animate-fade-in">
      <div className="space-y-3">
        <div>
          <p className="text-xs text-muted-foreground">Thông tin cá nhân</p>
          <h3 className="text-xl font-semibold text-card-foreground">{name}</h3>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Vai trò</p>
          <p className="font-medium text-card-foreground">{role}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Lớp hiện tại</p>
          <p className="font-semibold text-card-foreground">{currentClass}</p>
        </div>
      </div>
    </div>
  );
}
