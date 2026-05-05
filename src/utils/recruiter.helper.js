
function buildCvPreview(app) {
      const url = app?.cv?.fileUrl ?? app?.cvUrl;
      if (!url) return null;
      const ext = url.split(".").pop()?.split("?")[0]?.toLowerCase();
      return {
            name:
                  app.cv?.name ??
                  `CV - ${app.user?.profile?.fullName ?? app.user?.email ?? "ứng viên"}`,
            fileUrl: url,
            fileType:
                  app.cv?.fileType ?? (["pdf", "docx", "doc"].includes(ext) ? ext : "pdf"),
            fileSize: app.cv?.fileSize ?? null,
            isLocalBlob: false,
      };
}

export { buildCvPreview };