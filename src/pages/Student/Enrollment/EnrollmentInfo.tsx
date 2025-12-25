// import { MainLayout } from "@/components/layout/MainLayout";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { useEffect, useState } from "react";
// import { Edit, Plus, Search, Trash2 } from "lucide-react";
// import { Table } from "@/components/ui/table";
// import { Pagination, Modal, notification } from 'antd';
// import { addEnrollments, deleteEnrollments, getEnrollments } from "@/service/enrollmentService";
// import AddEnrollment from "./addEnrollment";
// import { StudentLayout } from "@/components/layout/StudentLayout";
// import { CourseSection } from "@/lib/interface";
// import { getCourseSections } from "@/service/courseSectionService";
// export default function EnrollmentInfo() {
//     const [Enrollments, setEnrollments] = useState([]);
//     const [courseSections, setCourseSections] = useState<CourseSection[]>([]);
//     const [openAdd, setOpenAdd] = useState(false);
//     const [checkedMap, setCheckedMap] = useState<Record<number, boolean>>({});


//     const [page, setPage] = useState(1);
//     const [pageSize] = useState(8);
//     const [totalEnrollments, setTotalEnrollments] = useState(0);
//     const [search, setSearch] = useState("");


//     const loadData = async () => {
//         try {
//             const [csRes, enRes] = await Promise.all([
//                 getCourseSections(),
//                 getEnrollmentsOfCurrentStudent()
//             ]);

//             setCourseSections(csRes.data);

//             const map: Record<number, number> = {};
//             enRes.data.forEach((e: any) => {
//                 map[e.courseSection.id] = e.id; 
//             });
//             setCheckedMap(map);

//         } catch (err) {
//             console.log(err);
//         }
//     };

//     useEffect(() => {
//         loadData();
//     }, []);

//     const handleToggle = async (m: any, checked: boolean) => {
//         try {
//             if (checked) {
//                 await addEnrollments({
//                     studentId: m.studentId,
//                     courseSectionId: m.courseSection.id,
//                 });

//                 notification.success({
//                     title: "Thành công",
//                     description: "Đăng kí học phần thành công!",
//                     placement: "topRight",
//                 });
//             } else {
//                 await deleteEnrollments(m.id);

//                 notification.success({
//                     title: "Thành công",
//                     description: "Hủy đăng kí học phần thành công!",
//                     placement: "topRight",
//                 });
//             }

//             setCheckedMap(prev => ({
//                 ...prev,
//                 [m.id]: checked,
//             }));

//             loadEnrollments(page);

//         } catch (error) {
//             notification.error({
//                 title: "Lỗi",
//                 description: "Thao tác thất bại!",
//                 placement: "topRight",
//             });
//         }
//     };



//     useEffect(() => {
//         loadEnrollments(page);
//     }, [page]);

//     const handleDelete = async (Enrollment: any) => {
//         Modal.confirm({
//             title: `Bạn có chắc muốn xóa ${Enrollment.Enrollmentname}?`,
//             okText: "Xóa",
//             cancelText: "Hủy",
//             okType: "danger",
//             onOk: async () => {
//                 try {
//                     await deleteEnrollments(Enrollment.id);
//                     notification.success({
//                         title: "Thành công",
//                         description: `Hủy đăng kí học phần có id là: ${Enrollment.id} thành công!`,
//                         placement: "topRight",
//                     });
//                     loadEnrollments(page);
//                 } catch (error) {
//                     notification.error({
//                         title: "Lỗi",
//                         description: `Hủy đăng kí học phần có id là: ${Enrollment.id} thất bại!`,
//                         placement: "topRight",
//                     });
//                 }
//             },
//             onCancel: () => {
//                 notification.info({
//                     title: "Hủy",
//                     description: `Bạn đã hủy xóa ${Enrollment.Enrollmentname}.`,
//                     placement: "topRight",
//                 });
//             },
//         });
//     };


//     return (
//         <StudentLayout>
//             <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                     <h1 className="text-2xl font-semibold text-foreground">Đăng kí lớp học phần</h1>
//                 </div>

//                 <Card className="card-shadow">
//                     <CardHeader className="flex flex-row items-center justify-between gap-4">
//                         <div className="relative w-full max-w-xs">
//                             <div className="relative w-full max-w-xs">
//                                 {/* <Search
//                                     className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground cursor-pointer"
//                                     onClick={() => {
//                                         setPage(1);
//                                         loadEnrollments(1);
//                                     }}
//                                 /> */}
//                             </div>

//                         </div>
//                     </CardHeader>

//                     <CardContent>
//                         <Table>
//                             <TableHeader>
//                                 <TableRow>
//                                     <TableHead>SubjectCode</TableHead>
//                                     <TableHead>Subject</TableHead>
//                                     <TableHead>Group</TableHead>
//                                     <TableHead>Credits</TableHead>
//                                     <TableHead>Quantity</TableHead>
//                                     <TableHead>Remaining</TableHead>
//                                     <TableHead>Action</TableHead>
//                                 </TableRow>
//                             </TableHeader>

//                             <TableBody>
//                                 {Enrollments.map((m) => (
//                                     <TableRow key={m.id} className="hover:bg-muted/50">

//                                         <TableCell>
//                                             {m.courseSection?.subject?.subjectCode}
//                                         </TableCell>
//                                         <TableCell>{m.courseSection?.subject?.subjectName}</TableCell>
//                                         <TableCell>{m.courseSection?.group}</TableCell>
//                                         <TableCell>{m.courseSection?.subject?.credits}</TableCell>
//                                         <TableCell>{m.courseSection?.quantity}</TableCell>
//                                         <TableCell>{m.courseSection?.remaining}</TableCell>
//                                         <TableCell className="flex gap-2">
//                                             <Input
//                                                 type="checkbox"
//                                                 checked={checkedMap[m.id] || false}
//                                                 onChange={(e) => handleToggle(m, e.target.checked)}
//                                                 className="w-4 h-4 cursor-pointer"
//                                             />

//                                             <Button
//                                                 variant="ghost"
//                                                 size="icon"
//                                                 onClick={() => handleDelete(m)}
//                                                 title="Xóa"
//                                             >
//                                                 <Trash2 className="h-4 w-4" />
//                                             </Button>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>

//                         <Pagination
//                             current={page}
//                             pageSize={pageSize}
//                             total={totalEnrollments}
//                             onChange={(page) => setPage(page)}
//                             showSizeChanger={false}
//                             className="mt-4"
//                         />

//                     </CardContent>
//                 </Card>

//                 <AddEnrollment
//                     isOpen={openAdd}
//                     onClose={() => setOpenAdd(false)}
//                     onAddSuccess={() => loadEnrollments(page)}
//                 />

//             </div>
//         </StudentLayout>
//     );
// }
