import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, ThumbsUp, Clock, Plus } from "lucide-react";

const posts = [
  {
    title: "Thông báo lịch thi cuối kỳ",
    author: "Cố vấn học tập",
    time: "2 giờ trước",
    replies: 15,
    likes: 32,
  },
  {
    title: "Hỏi về đăng ký môn học kỳ tới",
    author: "Nguyễn Văn A",
    time: "5 giờ trước",
    replies: 8,
    likes: 5,
  },
  {
    title: "Chia sẻ tài liệu ôn thi",
    author: "Trần Thị B",
    time: "1 ngày trước",
    replies: 24,
    likes: 45,
  },
];

export default function Forum() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Quản lí tài khoản</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Tạo bài viết
          </Button>
        </div>

        <div className="space-y-4">
          {posts.map((post, i) => (
            <Card key={i} className="card-shadow cursor-pointer transition-all hover:card-shadow-hover animate-fade-in">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-card-foreground mb-2">
                  {post.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{post.author}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    {post.replies}
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    {post.likes}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
