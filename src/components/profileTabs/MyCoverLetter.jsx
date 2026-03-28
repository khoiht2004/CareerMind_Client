import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function MyCoverLetter() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Thư xin việc</CardTitle>
          <Button size="sm" className="cursor-pointer">
            + Tạo mới
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground py-12 text-center">
          <FileText className="mx-auto mb-3 size-10 opacity-30" />
          <p className="text-sm">Chưa có thư xin việc nào</p>
          <p className="mt-1 text-xs">
            Tạo thư xin việc để ứng tuyển nhanh hơn
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default MyCoverLetter;
