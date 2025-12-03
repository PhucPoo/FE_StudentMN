import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import api from "@/service/api"

export default function AddStudent({ onClose, onAdded }) {
    const [form, setForm] = useState({
        fullName: "",
        gender: "",
        address: "",
        dob: ""
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const response = await api.post("/Students", form)
            alert("Thêm sinh viên thành công!")

            onAdded(response.data)
            setForm({ fullName: "", gender: "", address: "", dob: "" })
            onClose()
        } catch (err) {
            console.error(err)
            alert("Thêm sinh viên thất bại!")
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <Card className="w-full max-w-md shadow-lg rounded-2xl">
                <CardHeader className="flex justify-between items-center">
                    <CardTitle>Thêm sinh viên</CardTitle>
                    <Button variant="ghost" onClick={onClose} className="text-xl">✕</Button>
                </CardHeader>
                <CardContent className="space-y-4">

                    <div className="flex flex-col space-y-1">
                        <Label>Họ tên</Label>
                        <Input placeholder="Nhập họ tên" onChange={handleChange}/>
                    </div>

                    <div className="flex flex-col space-y-1">
                        <Label>Giới tính</Label>
                        <Input type="email" placeholder="Nhập giới tính" onChange={handleChange} />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <Label>Địa chỉ</Label>
                        <Input placeholder="Nhập số địa chỉ"  onChange={handleChange}/>
                    </div>

                    <div className="flex flex-col space-y-1">
                        <Label>Ngày sinh</Label>
                        <Input placeholder="ngày sinh"  onChange={handleChange}/>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={onClose}>Hủy</Button>
                        <Button onClick={handleSubmit} disabled={loading}>
                            {loading ? "Đang lưu..." : "Lưu sinh viên"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>

    )
}
