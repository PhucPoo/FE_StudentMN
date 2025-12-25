import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { Table } from "@/components/ui/table";
import { Pagination, Modal, notification } from 'antd';
import { getCourseSections } from "@/service/courseSectionService";

export default function CourseSectionInfo() {
  const [CourseSections, setCourseSections] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [totalCourseSections, setTotalCourseSections] = useState(0);
  const [search, setSearch] = useState("");


  const loadCourseSections = async (page: number) => {
    try {
      const res = await getCourseSections(page, pageSize, search);
      console.log(">>>>>>>",res);
      
      setCourseSections(res.data.data);
      setTotalCourseSections(res.data.totalCount);
    } catch (error) {
      console.log("Lỗi load CourseSection:", error);
    }
  };

  useEffect(() => {
    loadCourseSections(page);
  }, [page]);


  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Quản lí lớp học phần</h1>
        </div>

        <Card className="card-shadow">
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div className="relative w-full max-w-xs">
              <div className="relative w-full max-w-xs">
                <Input
                  placeholder="Tìm kiếm lớp học phần..."
                  className="pl-10 h-11 rounded-xl shadow-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Search
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground cursor-pointer"
                  onClick={() => {
                    setPage(1);
                    loadCourseSections(1);
                  }}
                />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SectionCode</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>MaxStudents</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {CourseSections.map((m) => (
                  <TableRow key={m.id} className="hover:bg-muted/50">

                    <TableCell>{m.sectionCode}</TableCell>
                    <TableCell>{m.subject.subjectName}</TableCell>
                    <TableCell>{m.teacher.user.fullName}</TableCell>
                    <TableCell>{m.semester}</TableCell>
                    <TableCell>{m.maxStudents}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Pagination
              current={page}
              pageSize={pageSize}
              total={totalCourseSections}
              onChange={(page) => setPage(page)}
              showSizeChanger={false}
              className="mt-4"
            />

          </CardContent>
        </Card>

      </div>
    </MainLayout>
  );
}
