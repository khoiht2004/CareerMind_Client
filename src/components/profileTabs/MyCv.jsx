import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function MyCv() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">CV của tôi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="hover:border-foreground/30 cursor-pointer space-y-3 rounded-xl border-2 border-dashed p-10 text-center transition-colors">
          <Upload className="text-muted-foreground mx-auto size-8" />
          <div>
            <p className="text-sm font-medium">
              Kéo thả hoặc nhấn để tải lên CV
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              Hỗ trợ PDF, DOC, DOCX (tối đa 5MB)
            </p>
          </div>
          <Button variant="outline" size="sm" className="cursor-pointer">
            Chọn file
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default MyCv;
