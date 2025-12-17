import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { notification, Select } from "antd";
import { addClasses } from "@/service/classService";
import { getMajors } from "@/service/majorService";
import { getTeachers } from "@/service/teacherService";

const { Option } = Select;

interface AddClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSuccess: () => void;
}

export default function AddClassModal({
  isOpen,
  onClose,
  onAddSuccess,
}: AddClassModalProps) {
  const [formData, setFormData] = useState({
    ClassName: "",
    CourseYear: "",
    MajorId:null,
    TeacherId:null,
  });
  const [majors,setMajors]=useState<any[]>([]);
  const [teachers,setTeachers]=useState<any[]>([]);
  const [page] = useState(1);
  const [pageSize] = useState(50);
  const [search] = useState("");
   useEffect(() => {
    const fetchMajors = async () => {
      try {
        const res = await getMajors(page, pageSize, search);
        setMajors(res.data.data);
        
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchMajors();
    const fetchTeachers = async ()=>{
       try {
        const res = await getTeachers(page, pageSize, search);
        setTeachers(res.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTeachers();
  }, []);
  const handleSubmit = async () => {
    if (!formData.ClassName.trim()) {
      notification.warning({
        title: "Cảnh báo",
        description: "Tên lớp không được để trống",
      });
      return;
    }

    if (!formData.CourseYear) {
      notification.warning({
        title: "Cảnh báo",
        description: "Khóa học không được để trống",
      });
      return;
    }

    if (!formData.MajorId) {
      notification.warning({
        title: "Cảnh báo",
        description: "Vui lòng chọn chuyên khoa",
      });
      return;
    }


    try {
      const payload = {
        ...formData,
      };

      await addClasses(payload);

      notification.success({
        title: "Thành công",
        description: "Thêm lớp thành công!",
        placement: "topRight",
      });

      setFormData({ ClassName: "", CourseYear: "" ,MajorId:null,TeacherId:null});
      onAddSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      notification.error({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi thêm lớp!",
        placement: "topRight",
      });
    }
  };

  if (!isOpen) return null;
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Thêm lớp</h2>

        <div className="space-y-4">
          <Input
            placeholder="Tên lớp"
            value={formData.ClassName}
            onChange={(e) =>
              setFormData({ ...formData, ClassName: e.target.value })
            }
          />
          <Input
            placeholder="Khóa"
            value={formData.CourseYear}
            onChange={(e) =>
              setFormData({ ...formData, CourseYear: e.target.value })
            }
          />
          <Select
            showSearch
            placeholder="-- Chọn chuyên khoa --"
            value={formData.MajorId ?? undefined}
            onChange={(value) =>
              setFormData({ ...formData, MajorId: value })
            }
            style={{ width: "100%" }}
          >
            {majors.map((major) => (
              <Option key={major.id} value={major.id}>
                {major.majorName}
              </Option>
            ))}
          </Select>
          <Select
            showSearch
            placeholder="-- Chọn giáo viên chủ nhiệm --"
            value={formData.TeacherId ?? undefined}
            onChange={(value) =>
              setFormData({ ...formData, TeacherId: value })
            }
            style={{ width: "100%" }}
          >
            {teachers.map((teacher) => (
              <Option key={teacher.id} value={teacher.id}>
                {teacher.majorName}
              </Option>
            ))}
          </Select>
        </div>

        <div className="flex justify-end mt-6 gap-2">
          <Button variant="secondary" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleSubmit}>Lưu</Button>
        </div>
      </div>
    </div>
  );
}
