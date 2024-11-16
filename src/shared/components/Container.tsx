import { cn } from "../utils/styleUtils";

export default function Container({
  className,
  children,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div
      className={cn("p-6 glass rounded-xl border border-white/10", className)}
      {...props}
    >
      {children}
    </div>
  );
}
