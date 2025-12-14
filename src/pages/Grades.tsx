
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StudentLayout } from "@/components/layout/StudentLayout";

const grades = [
  { id: "SV001", name: "Nguyễn Văn A", subject: "Toán cao cấp", midterm: 8.5, final: 7.5, avg: 7.9 },
  { id: "SV002", name: "Trần Thị B", subject: "Toán cao cấp", midterm: 9.0, final: 8.5, avg: 8.7 },
  { id: "SV003", name: "Lê Văn C", subject: "Toán cao cấp", midterm: 7.0, final: 6.5, avg: 6.7 },
  { id: "SV004", name: "Phạm Thị D", subject: "Toán cao cấp", midterm: 8.0, final: 8.0, avg: 8.0 },
];

export default function Grades() {
  return (
    <StudentLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Bảng điểm sinh viên</h1>

        <Card className="card-shadow">
          <CardHeader>
            <div className="flex gap-4">
              <Select defaultValue="caclc4">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Chọn lớp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="caclc4">CACLC4</SelectItem>
                  <SelectItem value="caclc3">CACLC3</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="math">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Chọn môn" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">Toán cao cấp</SelectItem>
                  <SelectItem value="physics">Vật lý</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã SV</TableHead>
                  <TableHead>Họ và tên</TableHead>
                  <TableHead>Môn học</TableHead>
                  <TableHead className="text-center">Giữa kỳ</TableHead>
                  <TableHead className="text-center">Cuối kỳ</TableHead>
                  <TableHead className="text-center">Trung bình</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grades.map((grade) => (
                  <TableRow key={grade.id}>
                    <TableCell className="font-medium">{grade.id}</TableCell>
                    <TableCell>{grade.name}</TableCell>
                    <TableCell>{grade.subject}</TableCell>
                    <TableCell className="text-center">{grade.midterm}</TableCell>
                    <TableCell className="text-center">{grade.final}</TableCell>
                    <TableCell className="text-center font-semibold">{grade.avg}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}
