import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Circle } from "lucide-react";

const conversations = [
  { name: "Trần Văn B", message: "Em muốn hỏi về lịch thi...", time: "10:30", unread: true },
  { name: "Nguyễn Thị C", message: "Dạ em đã nộp đơn rồi ạ", time: "09:15", unread: false },
  { name: "Lê Văn D", message: "Cảm ơn thầy!", time: "Hôm qua", unread: false },
  { name: "Phạm Thị E", message: "Em cần tư vấn về môn học", time: "Hôm qua", unread: true },
];

export default function Messages() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Tin nhắn</h1>
        
        <Card className="card-shadow">
          <CardHeader>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Tìm kiếm tin nhắn..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border">
              {conversations.map((conv, i) => (
                <div
                  key={i}
                  className="flex cursor-pointer items-center gap-4 py-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {conv.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-card-foreground">{conv.name}</span>
                      <span className="text-xs text-muted-foreground">{conv.time}</span>
                    </div>
                    <p className="truncate text-sm text-muted-foreground">{conv.message}</p>
                  </div>
                  {conv.unread && <Circle className="h-2 w-2 fill-primary text-primary" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
