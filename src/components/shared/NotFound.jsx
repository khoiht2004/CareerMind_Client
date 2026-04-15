import React from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function NotFound({ message = "Không tìm thấy" }) {
  const navigate = useNavigate();

  return (
    <div className="text-muted-foreground p-6 text-center">
      <p className="font-medium">{message}</p>
      <Button
        variant="link"
        className="cursor-pointer"
        onClick={() => navigate(-1)}
      >
        Quay lại
      </Button>
    </div>
  );
}

export function BackButton({ message = "Quay lại" }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="text-muted-foreground hover:text-foreground inline-flex cursor-pointer items-center gap-2 text-sm transition-colors"
    >
      <ArrowLeft className="size-4" />
      {message}
    </button>
  );
}
