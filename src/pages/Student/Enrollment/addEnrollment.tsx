// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input, notification, Select } from "antd";
// import { addEnrollments } from "@/service/enrollmentService";
// import { CourseSection, Student } from "@/lib/interface";
// const { Option } = Select;
// interface AddEnrollmentModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     onAddSuccess: () => void;
// }

// export default function AddEnrollmentModal({
//     isOpen,
//     onClose,
//     onAddSuccess,
// }: AddEnrollmentModalProps) {
//     const [coursesections, setCourseSections] = useState<CourseSection[]>();
//     const [selectedCourseSection, setSelectedCourseSection] =
//         useState<CourseSection | null>(null);
//     const [students, setStudents] = useState<Student[]>();
//     const [formData, setFormData] = useState({
//         studentId: null,
//         courseSectionId: null,
//     });

//     const handleSubmit = async () => {
//         try {
//             const payload = {
//                 studentId: formData.studentId,
//                 courseSectionId: formData.courseSectionId,
//             };

//             await addEnrollments(payload);

//             notification.success({
//                 title: "Thành công",
//                 description: "Đăng kí học phần thành công!",
//                 placement: "topRight",
//             });

//             setFormData({ studentId: "", courseSectionId: "" });
//             onAddSuccess();
//             onClose();
//         } catch (error) {
//             console.error(error);
//             notification.error({
//                 title: "Lỗi",
//                 description: "Có lỗi xảy ra khi đăng kí học phần!",
//                 placement: "topRight",
//             });
//         }
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//             <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
//                 <h2 className="text-xl font-semibold mb-4">Đăng kí học phần</h2>

//                 <div className="space-y-4">
//                     <Select
//                         showSearch
//                         placeholder="-- Chọn lớp học phần --"
//                         value={formData.courseSectionId || undefined}
//                         onChange={(value) => {
//                             const selected = coursesections?.find(c => c.id === value) || null;

//                             setFormData({ ...formData, courseSectionId: value });
//                             setSelectedCourseSection(selected);
//                         }}
//                         style={{ width: "100%" }}
//                     >
//                         {coursesections?.map((c) => (
//                             <Option key={c.id} value={c.id}>
//                                 {c.sectionCode}
//                             </Option>
//                         ))}
//                     </Select>
//                     {selectedCourseSection && (
//                         <Input
//                             value={selectedCourseSection.subject.subjectName}
//                             disabled
//                             placeholder="Tên lớp học"
//                         />
//                     )}

//                     <Select
//                         showSearch
//                         placeholder="-- Chọn sinh viên --"
//                         value={formData.studentId || undefined}
//                         onChange={(value) => setFormData({ ...formData, studentId: value })}
//                         style={{
//                             width: "100%",
//                             padding: "0.5rem 0.75rem",
//                             borderRadius: "0.375rem",
//                             border: "1px solid #d1d5db",
//                             backgroundColor: "#fff",
//                             fontSize: "1rem",
//                         }}

//                     >
//                         {students.map((s) => (
//                             <Option key={s.id} value={s.id}>
//                                 {s.user.fullName}
//                             </Option>
//                         ))}
//                     </Select>

//                 </div>

//                 <div className="flex justify-end mt-6 gap-2">
//                     <Button variant="secondary" onClick={onClose}>
//                         Hủy
//                     </Button>
//                     <Button onClick={handleSubmit}>Lưu</Button>
//                 </div>
//             </div>
//         </div>
//     );
// }
