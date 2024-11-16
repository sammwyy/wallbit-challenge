import { cn } from "../utils/styleUtils";

export default function Input({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500",
        className
      )}
    />
  );
}
