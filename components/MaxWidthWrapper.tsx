import { cn } from "@/lib/utils";

const MaxWidthWrapper = ({
  children,
  classname,
}: {
  children: React.ReactNode;
  classname?: string;
}) => {
  return <div className={cn("max-w-5xl m-auto", classname)}>{children}</div>;
};

export default MaxWidthWrapper;
