import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import api from "@/service/api";
import { Button } from "@/components/ui/button";
import AddStudent from "./AddStudent";
export default function StudentInfo() {

  const [student, setStudent] = useState([]);
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    api.get("/Students")
      .then(res => setStudent(res.data))
      .catch(err => console.log(err));
  }, [])

  const handleAdded =(newStudent)=>{
    setStudent((prev) => [...prev, newStudent ])
  }


  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Thông tin sinh viên</h1>

        <Card className="card-shadow">
          <CardHeader className="flex flex-row items-center justify-between gap-4">

            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm sinh viên..."
                className="pl-10 h-11 rounded-xl shadow-sm"
              />
            </div>
            <Button
              onClick={() => setShowModal(true)}
              variant="outline"
              className="h-20 w-32 flex flex-col items-center justify-center gap-2 rounded-2xl shadow-sm border-muted"
            >
              <Plus className="h-6 w-6" />
              <span className="text-sm">Thêm sinh viên</span>
            </Button>

          </CardHeader>
          {showModal && <AddStudent onClose={() => setShowModal(false)} onAdded={handleAdded} />}

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã SV</TableHead>
                  <TableHead>Họ và tên</TableHead>
                  <TableHead>Giới tính</TableHead>
                  <TableHead>Quê quán</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {student.map((student) => (
                  <TableRow key={student.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{student.studentId}</TableCell>
                    <TableCell>{student.fullName}</TableCell>
                    <TableCell>{student.gender}</TableCell>
                    <TableCell>{student.address}</TableCell>
                    <TableCell>{student.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
