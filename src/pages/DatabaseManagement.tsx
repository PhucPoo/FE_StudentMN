import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Users, BookOpen, FileText, Plus, Download, Upload } from "lucide-react";

const tables = [
  { name: "Sinh viên", icon: Users, records: 156, color: "text-info" },
  { name: "Môn học", icon: BookOpen, records: 24, color: "text-success" },
  { name: "Điểm số", icon: FileText, records: 1248, color: "text-warning" },
  { name: "Lớp học", icon: Database, records: 4, color: "text-purple" },
];

export default function DatabaseManagement() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Quản lý CSDL</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Xuất dữ liệu
            </Button>
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Nhập dữ liệu
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {tables.map((table) => (
            <Card
              key={table.name}
              className="card-shadow cursor-pointer transition-all hover:card-shadow-hover hover:-translate-y-0.5 animate-fade-in"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {table.name}
                </CardTitle>
                <table.icon className={`h-5 w-5 ${table.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">
                  {table.records.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">bản ghi</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="card-shadow">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Thao tác nhanh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Plus className="h-5 w-5" />
                Thêm sinh viên
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Plus className="h-5 w-5" />
                Thêm môn học
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Plus className="h-5 w-5" />
                Nhập điểm
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
