import { Student } from "@/lib/interface";
import { Modal, Descriptions } from "antd";
import { useEffect, useState } from "react";

interface DetailStudentProps {
  isOpen: boolean;
  onClose: () => void;
  studentData: any; 
}
export default function DetailStudent({ isOpen, onClose, studentData }: DetailStudentProps) {
  const [student, setStudent] = useState<Student>(null);

  useEffect(() => {
    if (studentData) {
      setStudent(studentData);
    }
  }, [studentData]);

  return (
    <Modal
      open={isOpen}
      title="Thông tin sinh viên"
      onCancel={onClose}
      footer={null}
      width={600}
    >
      {student ? (
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Avatar">
            <img
              src={student.avt}
              style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover" }}
            />
          </Descriptions.Item>
          <Descriptions.Item label="StudentCode">{student.studentCode}</Descriptions.Item>
          <Descriptions.Item label="FullName">{student.user.fullName}</Descriptions.Item>
          <Descriptions.Item label="DateOfBirth">
            {student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString('vi-VN') : ''}
          </Descriptions.Item>
          <Descriptions.Item label="Address">{student.address}</Descriptions.Item>
          <Descriptions.Item label="Gender">{student.gender}</Descriptions.Item>
          <Descriptions.Item label="Course">{student.course}</Descriptions.Item>
          <Descriptions.Item label="PhoneNumber">{student.phoneNumber}</Descriptions.Item>
          <Descriptions.Item label="Class">{student.class?.className}</Descriptions.Item>
        </Descriptions>
      ) : null}
    </Modal>
  );
}
