import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { Loader2, Paperclip, FileText } from "lucide-react";

import { useGetJobByIdQuery } from "@/services/job.service";
import { useApplyJobMutation } from "@/services/application.service";
import { useGetMyCoverLettersQuery } from "@/services/coverLetter.service";

function Apply() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: jobData } = useGetJobByIdQuery(id);
  const [applyJob, { isLoading }] = useApplyJobMutation();
  const { data: coverLettersData } = useGetMyCoverLettersQuery();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
    cvUrl: "",
  });
  const [coverLetterOpen, setCoverLetterOpen] = useState(false);

  const job = jobData?.data;
  const coverLetters = coverLettersData?.data ?? [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectCoverLetter = (cl) => {
    setFormData((prev) => ({ ...prev, coverLetter: cl.content }));
    setCoverLetterOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await applyJob({ jobId: id, ...formData }).unwrap();
      toast.success("Ứng tuyển thành công! Chúng tôi sẽ liên hệ bạn sớm.");
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || "Có lỗi xảy ra khi ứng tuyển");
    }
  };

  if (!job) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="text-primary size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Ứng tuyển vị trí</h1>
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-muted-foreground">{job.company}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin cá nhân</CardTitle>
            <CardDescription>
              Vui lòng cung cấp thông tin chính xác để chúng tôi có thể liên hệ
              với bạn
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Họ và tên *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại *</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CV và Hồ sơ</CardTitle>
            <CardDescription>
              Vui lòng tải lên CV của bạn. Chúng tôi khuyến khích sử dụng định
              dạng PDF.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cvUrl">
                Link CV (Google Drive, Dropbox, etc.)
              </Label>
              <Input
                id="cvUrl"
                name="cvUrl"
                value={formData.cvUrl}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="coverLetter">Thư giới thiệu (Tùy chọn)</Label>
                {coverLetters.length > 0 && (
                  <Popover open={coverLetterOpen} onOpenChange={setCoverLetterOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground h-7 gap-1.5 px-2 text-xs"
                      >
                        <Paperclip className="size-3.5" />
                        Dùng thư có sẵn
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-80 p-2">
                      <p className="text-muted-foreground mb-2 px-1 text-xs font-medium">
                        Chọn thư giới thiệu
                      </p>
                      <div className="space-y-1">
                        {coverLetters.map((cl) => (
                          <button
                            key={cl.id}
                            type="button"
                            onClick={() => handleSelectCoverLetter(cl)}
                            className="hover:bg-accent flex w-full items-start gap-2 rounded-md px-2 py-2 text-left transition-colors"
                          >
                            <FileText className="text-muted-foreground mt-0.5 size-4 shrink-0" />
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium">
                                {cl.title}
                              </p>
                              <p className="text-muted-foreground line-clamp-1 text-xs">
                                {cl.content}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
              <Textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                placeholder="Viết một vài dòng giới thiệu về bản thân và lý do bạn phù hợp với vị trí này..."
                rows={5}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(`/jobs/${id}`)}
            disabled={isLoading}
          >
            Quay lại
          </Button>
          <Button type="submit" disabled={isLoading} className="cursor-pointer">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Đang gửi...
              </>
            ) : (
              "Gửi hồ sơ"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Apply;
