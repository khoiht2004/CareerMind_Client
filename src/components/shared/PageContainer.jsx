import { cn } from "@/lib/utils";

function PageContainer({ children, className, as: Tag = "div", ...rest }) {
  return (
    <Tag
      className={cn("mx-auto w-full max-w-6xl space-y-6 p-6", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default PageContainer;
