import { Modal, Descriptions } from "antd";
import { useEffect, useState } from "react";

interface DetailTeacherProps {
  isOpen: boolean;
  onClose: () => void;
  teacherData: any; 
}
export default function DetailTeacher({ isOpen, onClose, teacherData }: DetailTeacherProps) {
  const [teacher, setTeacher] = useState<any>(null);

  useEffect(() => {
    if (teacherData) {
      setTeacher(teacherData);
    }
  }, [teacherData]);

  return (
    <Modal
      open={isOpen}
      title="Thông tin giảng viên"
      onCancel={onClose}
      footer={null}
      width={600}
    >
      {teacher ? (
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Avatar">
            <img
              src={teacher.avt}
              style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover" }}
            />
          </Descriptions.Item>
          <Descriptions.Item label="TeacherCode">{teacher.teacherCode}</Descriptions.Item>
          <Descriptions.Item label="FullName">{teacher.user.fullName}</Descriptions.Item>
          <Descriptions.Item label="DateOfBirth">
            {teacher.dateOfBirth ? new Date(teacher.dateOfBirth).toLocaleDateString('vi-VN') : ''}
          </Descriptions.Item>
          <Descriptions.Item label="Address">{teacher.address}</Descriptions.Item>
          <Descriptions.Item label="Gender">{teacher.gender}</Descriptions.Item>
          <Descriptions.Item label="Email">{teacher.user.email}</Descriptions.Item>
          <Descriptions.Item label="PhoneNumber">{teacher.phoneNumber}</Descriptions.Item>
        </Descriptions>
      ) : null}
    </Modal>
  );
}
